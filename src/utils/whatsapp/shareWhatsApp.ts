// utils/whatsapp/shareWhatsApp.ts

type ShareWhatsAppOptions = {
  text: string;
  title?: string;
  fallbackToCopy?: boolean;
};

export async function shareWhatsApp({
  text,
  title = 'Compartilhar',
  fallbackToCopy = true,
}: ShareWhatsAppOptions): Promise<void> {
  // Tenta usar a Web Share API
  if (navigator.share) {
    try {
      await navigator.share({
        text: text,
        title: title,
      });
      return;
    } catch (error) {
      // Se o usuário cancelar, não faz nada
      if ((error as Error).name === 'AbortError') {
        return;
      }
      // Para outros erros, continua para o fallback
      console.error('Erro ao compartilhar:', error);
    }
  }

  // Fallback: abre WhatsApp Web diretamente
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(whatsappUrl, '_blank');

  // Copia para área de transferência como backup (opcional)
  if (fallbackToCopy) {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Texto copiado para área de transferência');
    } catch (error) {
      console.error('Erro ao copiar texto:', error);
    }
  }
}
