// --- CONFIGURATION ---
const REFRESH_INTERVAL = 3000;
const API_URL = 'http://127.0.0.1:8000/api/status';

/**
 * Fonction "helper" compacte pour mettre à jour un élément du DOM.
 */
const updateElementStatus = (id, status) => {
    const element = document.getElementById(id);
    if (!element) return; // Sort si l'élément n'est pas trouvé

    element.textContent = status;

    // Logique de classe pour les couleurs
    const classMap = {
        'En Ligne': 'online',
        'Hors Ligne': 'offline',
        'Éteinte': 'offline',
        'Inconnu': 'unknown'
    };
    
    // Réinitialise la classe avant d'ajouter la nouvelle
    // Note: Votre HTML utilise <p> et non <span class="status">
    // Donc nous modifions directement la classe du <p>
    element.className = classMap[status] || 'unknown';
};

/**
 * Fonction fetch principale.
 */
const fetchData = async () => {
    let data;

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
        data = await response.json();

    } catch (error) {
        console.error("Fetch error:", error.message);
        data = { srv01: "Inconnu", cam01: "Inconnu" };
    }
    
    // --- C'EST LA PARTIE CORRIGÉE ---
    // On cible maintenant les BONS ID de votre HTML :
    // 'statut-serveur-principal' reçoit les données de 'data.srv01'
    updateElementStatus('statut-serveur-principal', data.srv01);
    
    // 'statut-camera-1' reçoit les données de 'data.cam01'
    updateElementStatus('statut-camera-1', data.cam01);
};

// --- POINT D'ENTRÉE ---
document.addEventListener('DOMContentLoaded', () => {
    fetchData(); // Appel initial
    setInterval(fetchData, REFRESH_INTERVAL); // Lancement de la boucle
});