/**
 * visor.js
 * Lógica para renderizar los datos del ticket JSON en HTML limpio.
 * Este archivo se ejecuta del lado del cliente y no viola las políticas de seguridad.
 */
function renderTicket() {
    const jsonInput = document.getElementById('jsonInput').value;
    const outputContainer = document.getElementById('ticket-output');
    
    outputContainer.innerHTML = ''; // Limpiar salida anterior

    if (!jsonInput) {
        outputContainer.innerHTML = '<p class="error">Por favor, pegue el JSON de los datos del ticket.</p>';
        return;
    }

    try {
        const jsonData = JSON.parse(jsonInput);
        
        // --- Extracción de Propiedades Clave ---
        // Ajusta estas propiedades si la estructura de JSON de ProManager cambia.
        const ticketId = jsonData.ticket_id || 'N/A';
        const titulo = jsonData.titulo || 'Sin Título';
        const estado = jsonData.estado_nombre || 'N/A';
        const descripcion = jsonData.descripcion || 'Sin descripción.';
        const comentarios = jsonData.comentarios || [];
        
        // Generar HTML de Comentarios
        let comentariosHtml = comentarios.map(c => 
            // Asegúrate de que c.fecha, c.usuario y c.texto existen en el JSON
            `<li><strong>${new Date(c.fecha).toLocaleString()}:</strong> ${c.usuario} - ${c.texto}</li>`
        ).join('');

        // Inyectar el HTML limpio en el contenedor de salida
        outputContainer.innerHTML = `
            <div class="ticket-header">
                <h1>Ticket N° ${ticketId}</h1>
                <p><strong>Título:</strong> ${titulo}</p>
                <p><strong>Estado:</strong> ${estado}</p>
                <p><strong>Generado:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <h2>Descripción</h2>
            <div class="descripcion">${descripcion}</div>
            
            <h2>Bitácora de Comentarios (${comentarios.length})</h2>
            <ul>${comentariosHtml || '<li>No hay comentarios registrados.</li>'}</ul>
        `;
        
        // Agregar botón de impresión
        outputContainer.innerHTML += '<button onclick="window.print()">Imprimir Vista Limpia Ahora</button>';

    } catch (e) {
        outputContainer.innerHTML = '<p class="error">Error al procesar el JSON. Asegúrese de que el texto pegado sea un objeto JSON válido.</p>';
        console.error("Error de parsing:", e);
    }
}
