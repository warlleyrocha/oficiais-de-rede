// services/storage/storageMigration.ts

/**
 * Migra dados antigos de 'launches' para 'material-launches'
 * Deve ser executado uma vez quando o app inicializar
 */
export function migrateOldLaunches(): void {
  try {
    const oldKey = 'launches';
    const newKey = 'material-launches';

    // Verifica se já foi migrado
    const alreadyMigrated = localStorage.getItem('migration-done');
    if (alreadyMigrated === 'true') {
      return;
    }

    // Pega dados antigos
    const oldData = localStorage.getItem(oldKey);

    if (oldData) {
      const launches = JSON.parse(oldData);

      // Adiciona o campo 'type' em cada lançamento
      const migratedLaunches = launches.map((launch: any) => ({
        ...launch,
        type: 'material',
      }));

      // Salva no novo formato
      localStorage.setItem(newKey, JSON.stringify(migratedLaunches));

      // Marca como migrado
      localStorage.setItem('migration-done', 'true');

      console.log('✅ Migração concluída com sucesso!');
    } else {
      // Não havia dados antigos, só marca como migrado
      localStorage.setItem('migration-done', 'true');
    }
  } catch (error) {
    console.error('❌ Erro na migração:', error);
  }
}

/**
 * Limpa dados de migração (útil para desenvolvimento/testes)
 */
export function resetMigration(): void {
  localStorage.removeItem('migration-done');
  console.log('🔄 Flag de migração resetada');
}
