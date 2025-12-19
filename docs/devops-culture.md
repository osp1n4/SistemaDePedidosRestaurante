# Manifiesto de Cultura DevOps - Taller 4: Engineering Excellence

## Introducción

Este documento establece el **Manifiesto de Colaboración Dev+Ops+QA** para el Taller 4: DevOps & Engineering Excellence. Define cómo los tres roles (Desarrollo, Operaciones y QA) trabajarán juntos para garantizar que la calidad sea automática y sostenible.

**Filosofía**: "Si duele, hazlo más seguido" – DevOps

---

## 1. Definición de Roles y Responsabilidades

### 1.1 Rol: Desarrollo (Dev)

**Responsabilidades**:
- Escribir código siguiendo el ciclo TDD (Red-Green-Refactor)
- Crear pruebas unitarias antes de implementar funcionalidad
- Documentar el código y las decisiones de diseño
- Participar en code reviews de otros desarrolladores
- Comunicar cambios y dependencias a Ops y QA
- Corregir defectos detectados por QA o herramientas automáticas.

**Autoridades**:
- Decidir sobre la arquitectura de componentes
- Seleccionar tecnologías y librerías (con aprobación de Ops)
- Definir estándares de codificación del equipo

**Canales de Comunicación**:
- Google Chat: #team
- Reuniones diarias: 9:00 AM (standup)
- Code reviews: GitHub Pull Requests

**Acceso a Herramientas**:
- GitHub (repositorio)
- Jest (testing framework) para JS y Pytest Para Python 
- IDE de preferencia
- Entorno local de desarrollo
W
---

### 1.2 Rol: Operaciones (Ops)

**Responsabilidades**:
- Configurar y mantener infraestructura (Docker, CI/CD)
- Garantizar que el pipeline ejecute pruebas de forma automática.
- Automatizar infraestructura y despliegues.
- Velar por la estabilidad del flujo desde el commit hasta el despliegue.
- Apoyar al equipo en la resolución de fallas del pipeline.
- Comunicar requisitos de infraestructura a Dev

**Autoridades**:
- Decidir sobre estrategias de despliegue
- Configurar y mantener pipelines CI/CD
- Establecer políticas de seguridad y acceso

**Canales de Comunicación**:
- Google Chat: #team
- Reuniones diarias: 9:00 AM (standup)
- Escaladas: Contacto directo + Slack

**Acceso a Herramientas**:
- GitHub (repositorio)
- GitHub Actions
- SonarQube
- Herramientas de monitoreo

---

### 1.3 Rol: QA (Quality Assurance)

**Responsabilidades**:
- Definir criterios de aceptación claros y medibles.
- Diseñar estrategias de prueba automatizadas.
- Validar riesgos funcionales y no funcionales.
- Validar que el código cumple con Quality Gates
- Ejecutar análisis estático con SonarCloud
- Reportar code smells y vulnerabilidades
- Supervisar cobertura de pruebas
- Comunicar problemas de calidad a Dev

**Autoridades**:
- Establecer umbrales de calidad (cobertura, bugs, mantenibilidad)
- Decidir sobre herramientas de análisis estático
- Bloquear merges que no cumplan Quality Gates

**Canales de Comunicación**:
- Google Chat: #team
- Reuniones diarias: 9:00 AM (standup)
- Reportes: GitHub Issues

**Acceso a Herramientas**:
- GitHub (repositorio)
- SonarCloud
- Herramientas de análisis estático

---

## 2. Protocolos de Comunicación

### 2.1 Comunicación Diaria

**Standup Diario** (9:00 AM)
- Duración: 15 minutos
- Participantes: Dev, Ops, QA
- Formato: Cada rol reporta:
  - ✅ Qué completó ayer
  - 🏗️ Qué hará hoy
  - 🚧 Bloqueantes o dependencias

**Google Chat Channels**:
- `#team`: Discusiones técnicas de desarrollo + QA + Ops
- `#devops-general`: Comunicación entre equipos

### 2.2 Comunicación de Cambios

**Cuando Dev hace cambios**:
1. Crear feature branch desde `develop`
2. Implementar cambios siguiendo TDD
3. Crear Pull Request con descripción clara
4. Notificar a Ops y QA en Google Chat
5. Esperar aprobaciones y validaciones

**Cuando Ops hace cambios de infraestructura**:
1. Comunicar cambios en `#ops-team`
2. Documentar  las operaciones
3. Notificar a Dev sobre impacto
4. Ejecutar cambios en horario acordado

**Cuando QA identifica problemas**:
1. Crear GitHub Issue con detalles
2. Notificar a Dev 
3. Incluir pasos para reproducir
4. Priorizar según severidad

### 2.3 Escalada de Problemas

**Nivel 1: Comunicación Directa**
- Problema: Bloqueo técnico menor
- Acción: Mensaje directo en Google Chat
- Tiempo de respuesta: 30 minutos

**Nivel 2: Reunión de Equipo**
- Problema: Bloqueo que afecta múltiples roles
- Acción: Reunión urgente (máx 30 min)
- Participantes: Líderes de cada rol
- Tiempo de respuesta: 1 hora

**Nivel 3: Escalada a Liderazgo**
- Problema: Bloqueo crítico que afecta deadline
- Acción: Contacto con Tech Lead
- Tiempo de respuesta: Inmediato

---

## 3. Procedimientos de Escalada

### 3.1 Conflicto: Dev vs Ops

**Escenario**: Dev quiere usar una tecnología que Ops considera riesgosa

**Procedimiento**:
1. Dev y Ops discuten en Google Chat con argumentos técnicos
2. Si no hay acuerdo en 1 hora, escalada a Tech Lead
3. Tech Lead toma decisión considerando:
   - Riesgo operacional
   - Beneficio técnico
   - Tiempo de implementación
4. Decisión es documentada y comunicada

### 3.2 Conflicto: Dev vs QA

**Escenario**: QA bloquea merge por Quality Gate que Dev considera innecesario

**Procedimiento**:
1. Dev y QA discuten en GitHub Issue
2. Dev propone alternativa o justificación
3. Si no hay acuerdo, escalada a Tech Lead
4. Tech Lead revisa código y métricas
5. Decisión es documentada

### 3.3 Conflicto: Ops vs QA

**Escenario**: Ops quiere desplegar cambio que QA considera riesgoso

**Procedimiento**:
1. Ops y QA discuten en Google Chat
2. QA proporciona análisis de riesgo
3. Si no hay acuerdo, escalada a Tech Lead
4. Tech Lead decide si desplegar o esperar validaciones

---

## 4. Guías de Onboarding para Nuevos Miembros

### 4.1 Primer Día

**Para todos los roles**:
- [ ] Acceso a GitHub y repositorio
- [ ] Acceso a Google Chat y canales relevantes
- [ ] Lectura de este Manifiesto
- [ ] Setup de entorno local

**Para Dev**:
- [ ] Instalación de Node.js, npm, Jest, python
- [ ] Clonación del repositorio
- [ ] Ejecución de tests locales
- [ ] Lectura de README.md

**Para Ops**:
- [ ] Acceso a GitHub Actions
- [ ] Lectura de documentación de infraestructura
- [ ] Setup de herramientas de monitoreo

**Para QA**:
- [ ] Acceso a SonarCloud
- [ ] Lectura de Quality Gates
- [ ] Familiarización con métricas
- [ ] Setup de herramientas de análisis

### 4.2 Primera Semana

**Día 2-3: Entrenamiento Técnico**
- Arquitectura del sistema (1 hora)
- Flujo de desarrollo (1 hora)
- Herramientas y workflows (1 hora)
---

## 5. Flujo de Trabajo Integrado

### 5.1 Ciclo de Desarrollo

```
1. Dev selecciona tarea
   ↓
2. Dev crea feature branch
   ↓
3. Dev implementa con TDD (Red-Green-Refactor)
   ↓
4. Dev crea Pull Request
   ↓
5. Ops revisa cambios de infraestructura
   ↓
6. QA valida con SonarCloud y Quality Gates
   ↓
7. Dev realiza cambios solicitados (si aplica)
   ↓
8. Merge a develop (cuando todo pasa)
   ↓
9. Ops despliega a staging
   ↓
10. QA valida en staging
    ↓
11. Ops despliega a producción
```

### 5.2 Responsabilidades en Cada Etapa

| Etapa | Dev | Ops | QA |
|-------|-----|-----|-----|
| Seleccionar tarea | ✅ | - | - |
| Implementar con TDD | ✅ | - | - |
| Code review | ✅ | ✅ | - |
| Validar infraestructura | - | ✅ | - |
| Validar calidad | - | - | ✅ |
| Desplegar | - | ✅ | - |
| Validar en producción | - | ✅ | ✅ |

---

## 6. Métricas de Éxito

### 6.1 Métricas de Desarrollo

- **Cobertura de pruebas**: ≥ 80%
- **Ciclos TDD completados**: 100% de features
- **Commits etiquetados**: [RED], [GREEN], [REFACTOR]

### 6.2 Métricas de Operaciones

- **Tiempo de despliegue**: < 5 minutos
- **Disponibilidad del sistema**: > 99.5%
- **Tiempo de recuperación ante fallos**: < 5 minutos

### 6.3 Métricas de Calidad

- **Quality Gates pasando**: 100%
- **Code smells críticos**: 0
- **Bugs críticos**: 0
- **Mantenibilidad**: ≥ A

---

## 7. Compromisos del Equipo

**Dev se compromete a**:
- ✅ Escribir código siguiendo TDD
- ✅ Documentar cambios y decisiones
- ✅ Participar en code reviews
- ✅ Comunicar dependencias a tiempo

**Ops se compromete a**:
- ✅ Mantener infraestructura estable
- ✅ Documentar procedimientos
- ✅ Responder a incidentes rápidamente
- ✅ Comunicar cambios de infraestructura

**QA se compromete a**:
- ✅ Validar calidad de código
- ✅ Reportar problemas claramente
- ✅ Supervisar Quality Gates
- ✅ Comunicar métricas regularmente

---

## 8. Revisión y Actualización

Este Manifiesto será revisado:
- **Mensualmente**: En reunión de retrospectiva
- **Cuando sea necesario**: Si hay cambios significativos en el equipo o procesos

**Última actualización**: Taller 4 - Semana 1
**Próxima revisión**: Fin de mes

---

**Firmado por**:
- Equipo de Desarrollo
- Equipo de Operaciones
- Equipo de QA

**Fecha**: [Fecha actual]
