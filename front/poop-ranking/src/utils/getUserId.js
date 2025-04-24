export const getUserId = (token) => {
    if (!token) return null;

    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );

        const payload = JSON.parse(jsonPayload);
        console.log('Payload:', payload.id); // Adicione este log para depuração
        return payload.id || null;
    } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        return null;
    }
}