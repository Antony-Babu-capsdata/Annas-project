// api/models/Students.js
module.exports = {
    /**
     * This model definition is now primarily for documentation purposes
     * since we're using Knex directly for database operations
     */
    tableName: 'Students',
    description: 'Students information and departments',
    
    attributes: {
      name: {
        type: 'string',
        columnType: 'varchar(255)',
        required: true,
        description: 'Students name',
        maxLength: 255
      },
      description: {
        type: 'string',
        columnType: 'varchar(255)',
        description: 'description',
        maxLength: 255
      },
     ai_created_on: {
        type: 'boolean',
        columnType: 'boolean',
        description: 'description number',
        
      },
      createdAt: {
        type: 'number',
        columnType: 'bigint',
        autoCreatedAt: true,
        description: 'Timestamp when record was created'
      },
      updatedAt: {
        type: 'number',
        columnType: 'bigint',
        autoUpdatedAt: true,
        description: 'Timestamp when record was last updated'
      }
    },
  
    /**
     * These settings are no longer used for database operations,
     * but kept for reference
     */
  };