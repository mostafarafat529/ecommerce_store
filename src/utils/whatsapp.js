import { storeConfig } from '../data/store.js';
import { formatPriceFull } from './formatPrice.js';

export function buildWhatsAppBaseUrl(message) {
  const cleanNumber = String(storeConfig.whatsappNumber).replace(/[^\d]/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}

export function getWhatsAppInquiryUrl(customMessage) {
  const text = customMessage || 'مرحباً، أريد الاستفسار عن أحد منتجاتكم.';
  return buildWhatsAppBaseUrl(text);
}

export function buildOrderWhatsAppMessage({
  customer,
  deliveryMethod,
  items,
  subtotal,
  totalDiscount,
  shippingCost,
  finalTotal,
}) {
  const lines = [];

  lines.push(`السلام عليكم، أرغب في تأكيد طلب من ${storeConfig.brandName}.`);
  lines.push('');
  lines.push('بيانات العميل:');
  lines.push('');
  lines.push(`الاسم: ${customer.fullName.trim()}`);
  lines.push(`رقم الهاتف: ${customer.phone.trim()}`);
  if (customer.whatsapp && customer.whatsapp.trim() !== customer.phone.trim()) {
    lines.push(`رقم واتساب: ${customer.whatsapp.trim()}`);
  }

  if (deliveryMethod === 'pickup') {
    lines.push(`طريقة الاستلام: الاستلام من مقر البراند (${storeConfig.pickupAddress})`);
  } else {
    lines.push('طريقة الاستلام: التوصيل للمنزل');
    lines.push(`المحافظة: ${customer.governorate}`);
    lines.push(`المنطقة: ${customer.city.trim()}`);
    lines.push(`العنوان: ${customer.address.trim()}`);
  }

  if (customer.notes && customer.notes.trim()) {
    lines.push(`ملاحظات: ${customer.notes.trim()}`);
  }

  lines.push('');
  lines.push('تفاصيل المنتجات:');
  lines.push('');

  items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.name}`);
    if (item.selectedVolume) {
      lines.push(`الحجم: ${item.selectedVolume}`);
    }
    if (item.selectedSize) {
      lines.push(`المقاس: ${item.selectedSize}`);
    }
    if (item.selectedColor) {
      lines.push(`اللون: ${item.selectedColor}`);
    }
    lines.push(`الكمية: ${item.quantity}`);
    if (item.quantity > 1) {
      lines.push(`سعر القطعة: ${formatPriceFull(item.unitPrice)}`);
      lines.push(`الإجمالي: ${formatPriceFull(item.unitPrice * item.quantity)}`);
    } else {
      lines.push(`السعر: ${formatPriceFull(item.unitPrice)}`);
    }
    lines.push('');
  });

  lines.push('ملخص الحساب:');
  lines.push('');
  lines.push(`إجمالي المنتجات: ${formatPriceFull(subtotal)}`);
  if (totalDiscount > 0) {
    lines.push(`الخصم (توفير على العروض): ${formatPriceFull(totalDiscount)}`);
  }
  lines.push(
    `الشحن: ${shippingCost === 0 ? 'مجاني' : formatPriceFull(shippingCost)}`
  );
  lines.push(`الإجمالي النهائي: ${formatPriceFull(finalTotal)}`);
  lines.push('');
  lines.push('طريقة الدفع: الدفع عند الاستلام (Cash on Delivery).');
  lines.push('');
  lines.push('برجاء تأكيد الطلب وتوضيح موعد التوصيل.');

  return lines.join('\n');
}

export function getWhatsAppOrderUrl(orderPayload) {
  const message = buildOrderWhatsAppMessage(orderPayload);
  return {
    message,
    url: buildWhatsAppBaseUrl(message),
  };
}
