// ============================================
// SCRIPT PARA EJECUTAR CONCEPTOS AVANZADOS
// ============================================

import { demonstrateAdvancedConcepts } from './advanced-concepts';

// Función principal
async function main() {
  console.log('🚀 INICIANDO DEMOSTRACIÓN DE CONCEPTOS AVANZADOS');
  console.log('================================================\n');
  
  try {
    // Ejecutar demostración de conceptos avanzados
    demonstrateAdvancedConcepts();
    
    console.log('\n🎉 ¡DEMOSTRACIÓN COMPLETADA EXITOSAMENTE!');
    console.log('==========================================');
    
  } catch (error) {
    console.error('❌ Error durante la demostración:', error);
  }
}

// Ejecutar si es el archivo principal
if (require.main === module) {
  main().catch(console.error);
}

export { main }; 