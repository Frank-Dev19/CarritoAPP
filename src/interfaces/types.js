/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} title
 * @property {string} brand
 * @property {number} price
 * @property {number} discountPercentage
 * @property {number} totalPrice
 * @property {string} thumbnail
 */

/**
 * @typedef {Object} CartItem
 * @property {number} idDetalle
 * @property {number} idProducto
 * @property {string} sku
 * @property {number} precio
 * @property {number} cantidad
 * @property {string} imagen
 */

/**
 * @typedef {Object} Cart
 * @property {number} idCarrito
 * @property {number} idUsuario
 * @property {number} totalCompra
 * @property {string} fechaCreacion
 * @property {CartItem[]} items
 */

/**
 * @typedef {Object} User
 * @property {number} idUsuario
 * @property {string} nombre
 */

/**
 * @typedef {Object} AddToCartPayload
 * @property {number} idProducto
 * @property {string} sku
 * @property {number} precio
 * @property {number} [cantidad]
 * @property {string} [imagen]
 */

export {};
