import type { CartItem } from '../types'

export const formatInstagramMessage = (
  items: CartItem[],
  customerInfo: {
    name: string;
    phone: string;
    email?: string;
    address: string;
    pincode: string;
    city: string;
    state: string;
  }
) => {
  let message = 'Hello Foundly._,\n\nI want to place the following order.\n\n';

  items.forEach((item, index) => {
    message += `${index + 1}.\n${item.name} ×${item.quantity}\n\n`;
  });

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  message += `Total Products: ${totalQuantity}\nTotal Price: ₹${totalPrice}\n\n`;
  
  message += `Customer Name:\n${customerInfo.name}\n\n`;
  message += `Phone:\n${customerInfo.phone}\n\n`;
  if (customerInfo.email) {
    message += `Email:\n${customerInfo.email}\n\n`;
  }
  
  message += `Delivery Address:\n${customerInfo.address},\n${customerInfo.city},\n${customerInfo.state},\n${customerInfo.pincode}\n\n`;
  
  message += 'Please confirm my order.';

  return message; // No longer URI encoding because we will copy to clipboard
};

export const openInstagramCheckout = (message: string, instagramUsername: string = 'foundly._') => {
  // Instagram URL scheme doesn't support pre-filled text like WhatsApp.
  // We copy to clipboard first, then open Instagram DM.
  navigator.clipboard.writeText(message).then(() => {
    alert("Order details copied to clipboard! Please paste them in our Instagram DMs to complete your order.");
    const url = `https://www.instagram.com/foundly._?stkn=MXUwbnA3bmQ1cG1yZA%3D%3D&utm_source=qr}`;
    window.open(url, '_blank');
  }).catch(() => {
    // Fallback if clipboard fails
    const url = `https://www.instagram.com/foundly._?stkn=MXUwbnA3bmQ1cG1yZA%3D%3D&utm_source=qr}`;
    window.open(url, '_blank');
  });
};

