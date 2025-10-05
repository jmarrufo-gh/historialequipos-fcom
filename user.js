// ==UserScript==
// @name         Limpiador de Vista ProManager Ticket
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Limpia la vista de tickets de ProManager para una impresión eficiente.
// @match        https://serviciomda.promanager.cl/tickets_detalles/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // 1. Inyecta los estilos de limpieza para la impresión
    GM_addStyle(`
        /* Oculta elementos no esenciales al imprimir */
        @media print {
            .header-bar, .side-menu, .footer, .actions-bar, .unwanted-buttons {
                display: none !important;
            }
            body {
                background-color: white !important;
                margin: 0;
                padding: 0;
            }
            /* Asegura que solo el contenido principal (ajusta este selector) sea visible */
            .main-content-container { 
                width: 100% !important;
                float: none !important;
                margin: 0 !important;
                padding: 0 !important;
            }
        }
    `);

    // 2. Crea un botón para probar la vista en pantalla (opcional)
    function createCleanViewButton() {
        const btn = document.createElement('button');
        btn.textContent = 'Generar Vista para Imprimir (Ctrl+P)';
        btn.style.cssText = 'position: fixed; top: 10px; right: 10px; z-index: 9999; padding: 10px; background-color: #008cba; color: white; border: none; cursor: pointer;';
        
        btn.onclick = () => {
            // Cuando se presiona, simplemente abre el diálogo de impresión
            window.print();
        };
        
        // Asume que hay una barra de navegación o un lugar para insertar el botón
        const header = document.querySelector('header') || document.body;
        header.appendChild(btn);
    }

    // Espera a que la página cargue completamente para evitar errores
    window.addEventListener('load', createCleanViewButton);

})();
