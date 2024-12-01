const TOKEN_KEY = 'token';

export const Auth = {
    login: (token) => {
        localStorage.setItem(TOKEN_KEY, token);
    },

    // Overenie, či je používateľ prihlásený
    isAuthenticated: () => {
        const token = localStorage.getItem(TOKEN_KEY);
        return token !== null; // Prípadne pridaj validáciu tokenu
    },

    // Odhlásenie
    logout: () => {
        localStorage.removeItem(TOKEN_KEY);
    },

    // Získanie aktuálneho tokenu
    getToken: () => {
        return localStorage.getItem(TOKEN_KEY);
    },
};
