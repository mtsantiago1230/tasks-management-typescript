"use strict";
// ============================================
// SCRIPT PARA EJECUTAR CONCEPTOS AVANZADOS
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const advanced_concepts_1 = require("./advanced-concepts");
// Función principal
async function main() {
    console.log('🚀 INICIANDO DEMOSTRACIÓN DE CONCEPTOS AVANZADOS');
    console.log('================================================\n');
    try {
        // Ejecutar demostración de conceptos avanzados
        (0, advanced_concepts_1.demonstrateAdvancedConcepts)();
        console.log('\n🎉 ¡DEMOSTRACIÓN COMPLETADA EXITOSAMENTE!');
        console.log('==========================================');
    }
    catch (error) {
        console.error('❌ Error durante la demostración:', error);
    }
}
// Ejecutar si es el archivo principal
if (require.main === module) {
    main().catch(console.error);
}
//# sourceMappingURL=run-advanced.js.map