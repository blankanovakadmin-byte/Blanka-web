import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/resend';
import { MentoringBookingEmail } from '@/emails/mentoring-booking';
import { CourseWelcomeEmail } from '@/emails/course-welcome';
import { DigitalProductDeliveryEmail } from '@/emails/digital-product-delivery';
import { getActiveCourses, getActiveProducts } from '@/lib/airtable';
import { getAdminSession } from '@/lib/auth';
import { getProductPdfUrl, generateSignedUrl } from '@/lib/blob';

export async function POST(req: NextRequest) {
  const adminToken = process.env.ADMIN_TOKEN;
  const headerToken = req.headers.get('x-admin-token');
  const sessionOk = await getAdminSession();
  if (!sessionOk && (!adminToken || headerToken !== adminToken)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { to, name, type, productId } = await req.json() as { to: string; name?: string; type?: string; productId?: string };
  if (!to) return NextResponse.json({ error: 'Hiányzó email cím.' }, { status: 400 });

  if (type === 'digital') {
    const products = await getActiveProducts();
    const product = productId
      ? products.find(p => p.id === productId)
      : products.find(p => p.category === 'premium');
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    const rawBlobUrl = product.blobKey || await getProductPdfUrl(product.id);
    if (!rawBlobUrl) return NextResponse.json({ error: `No PDF for product: ${product.title}` }, { status: 404 });
    const downloadUrl = await generateSignedUrl(rawBlobUrl);
    await sendEmail({
      to,
      subject: `[TEST] A letöltésed: ${product.title}`,
      template: DigitalProductDeliveryEmail({ email: to, productTitle: product.title, downloadUrl }),
    });
    return NextResponse.json({ ok: true, sent_to: to, type: 'digital', productTitle: product.title });
  }

  if (type === 'course') {
    const courses = await getActiveCourses();
    const course = courses[0];
    await sendEmail({
      to,
      subject: `Üdvözöllek a(z) ${course?.title ?? 'Magabiztosan Angolul'} kurzuson! 🎉`,
      template: CourseWelcomeEmail({
        email: to,
        name: name || 'Márton',
        courseTitle: course?.title ?? 'Magabiztosan Angolul',
        courseUrl: course?.systemeioUrl,
      }),
    });
    return NextResponse.json({ ok: true, sent_to: to, type: 'course' });
  }

  // Default: mentoring booking email
  await sendEmail({
    to,
    subject: 'Foglald le a havi két alkalmadat! 📅',
    template: MentoringBookingEmail({ email: to, name: name || 'Márton' }),
  });
  return NextResponse.json({ ok: true, sent_to: to, type: 'mentoring' });
}
