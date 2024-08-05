'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('variants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        unique: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sku: {
        allowNull: false,
        type: Sequelize.STRING
      },
      position: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      compare_at_price: {
        type: Sequelize.DECIMAL(10, 2)
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2)
      },
      weight: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      weight_unit: {
        allowNull: false,
        type: Sequelize.STRING
      },
      quantity: {
        allowNull: false,
        defaultValue: 99,
        type: Sequelize.INTEGER
      },
      presentment_prices: {
        allowNull: true,
        defaultValue: [],
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('variants')
  }
}
