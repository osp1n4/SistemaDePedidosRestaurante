import { useState } from 'react'
import './App.css'

function App() {
  // Estado para simular pedidos entrantes
  const [pedidos, setPedidos] = useState([
    {
      id: 37,
      mesa: 1,
      productos: [
        { nombre: 'Cheeseburger', cantidad: 1 },
        { nombre: 'Tonabac Pickles', cantidad: 1, emoji: '🔴🔴' },
        { nombre: 'Large Fries', cantidad: 1 },
        { nombre: 'Coke', cantidad: 1 }
      ],
      especificaciones: ['No Onion', 'Extra Ketchup'],
      estado: 'pendiente' // pendiente, en-preparacion, listo
    },
    {
      id: 38,
      mesa: 5,
      productos: [
        { nombre: 'Pizza Margarita', cantidad: 2 },
        { nombre: 'Sprite', cantidad: 2 }
      ],
      especificaciones: ['Extra Cheese'],
      estado: 'pendiente'
    }
  ])

  const cambiarEstado = (id, nuevoEstado) => {
    setPedidos(pedidos.map(pedido => 
      pedido.id === id ? { ...pedido, estado: nuevoEstado } : pedido
    ))
  }

  const obtenerColorEstado = (estado) => {
    switch(estado) {
      case 'pendiente': return '#ff4444'
      case 'en-preparacion': return '#ffaa00'
      case 'listo': return '#44cc44'
      default: return '#ccc'
    }
  }

  return (
    <div className="kitchen-container">
      {/* Header */}
      <header className="kitchen-header">
        <div className="logo-section">
          <div className="logo-icon">🌭</div>
          <div className="logo-text">
            <div className="logo-title">RÁPIDO</div>
            <div className="logo-subtitle">Y SABROSO</div>
          </div>
        </div>
        <div className="header-actions">
          <button className="icon-btn">📋</button>
          <button className="icon-btn">➕</button>
        </div>
      </header>

      {/* Grid de pedidos */}
      <div className="pedidos-grid">
        {pedidos.map(pedido => (
          <div key={pedido.id} className="pedido-card">
            {/* Encabezado del pedido */}
            <div className="pedido-header">
              <h2 className="pedido-numero">Pedido #{pedido.id}</h2>
              <div 
                className="estado-indicator" 
                style={{ backgroundColor: obtenerColorEstado(pedido.estado) }}
              />
            </div>

            {/* Mesa */}
            <div className="mesa-info">
              <span className="mesa-badge">Mesa {pedido.mesa}</span>
              <span className="mesa-label">Mesa {pedido.mesa}</span>
            </div>

            {/* Contenido principal */}
            <div className="pedido-content">
              {/* Productos */}
              <div className="productos-section">
                <h3 className="section-title">Productos</h3>
                <div className="productos-list">
                  {pedido.productos.map((producto, idx) => (
                    <div key={idx} className="producto-item">
                      {producto.cantidad}x {producto.nombre}
                      {producto.emoji && <span className="producto-emoji"> {producto.emoji}</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Especificaciones */}
              <div className="especificaciones-section">
                <h3 className="section-title">Especificaciones</h3>
                <div className="especificaciones-list">
                  {pedido.especificaciones.map((esp, idx) => (
                    <div key={idx} className="especificacion-item">
                      - {esp}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="pedido-actions">
              {pedido.estado === 'pendiente' && (
                <button 
                  className="btn-action btn-preparar"
                  onClick={() => cambiarEstado(pedido.id, 'en-preparacion')}
                >
                  Iniciar Preparación
                </button>
              )}
              {pedido.estado === 'en-preparacion' && (
                <button 
                  className="btn-action btn-listo"
                  onClick={() => cambiarEstado(pedido.id, 'listo')}
                >
                  Marcar como Listo
                </button>
              )}
              {pedido.estado === 'listo' && (
                <div className="estado-listo">
                  ✓ Pedido Listo para Entregar
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
