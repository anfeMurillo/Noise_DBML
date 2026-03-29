# DBML — Referencia de Sintaxis Completa

> Documentación extraída de [dbml.dbdiagram.io](https://dbml.dbdiagram.io/docs) para implementar compatibilidad de sintaxis en proyectos propios de DBML.
> DBML (Database Markup Language) es un lenguaje open-source para definir estructuras de bases de datos de forma legible y agnóstica al motor de base de datos.

---

## Tabla de Contenidos

1. [Referencia del Lenguaje](#1-referencia-del-lenguaje)
2. [Project Definition](#2-project-definition)
3. [Schema Definition](#3-schema-definition)
4. [Table Definition](#4-table-definition)
5. [Column Definition](#5-column-definition)
6. [Check Definition](#6-check-definition)
7. [Index Definition](#7-index-definition)
8. [Relationships & Foreign Keys](#8-relationships--foreign-keys)
9. [Enum Definition](#9-enum-definition)
10. [TablePartial](#10-tablepartial)
11. [Data Sample (Records)](#11-data-sample-records)
12. [Notas (Notes)](#12-notas-notes)
13. [Sticky Notes](#13-sticky-notes)
14. [TableGroup](#14-tablegroup)
15. [Colores](#15-colores)

---

## 1. Referencia del Lenguaje

### Delimitadores y Tokens

| Token | Uso |
|---|---|
| `{}` | Agrupación: cuerpo de tablas, índices, constraints |
| `[]` | Settings/configuración de columnas, relaciones, índices |
| `//` | Comentario de una línea |
| `/* */` | Comentario multilínea |
| `'string'` | Valor de cadena de texto |
| `"column name"` | Escapar nombres de columna con espacios |
| `'''multiline'''` | Cadena multilínea |
| `` `expr` `` | Expresión de función (SQL expression) |

### Comentarios

```dbml
// Comentario de una línea

/*
  Comentario
  multilínea
*/
```

### Cadenas Multilínea

Se definen entre triple comilla simple `'''`:

```dbml
Note: '''
  Esta es una cadena multilínea.
  Puede abarcar varias líneas.
'''
```

- Salto de línea: tecla Enter
- Continuación de línea: `\` (backslash)
- Escape de `\`: usar `\\`
- Escape de `'`: usar `\'`
- El parser elimina automáticamente la indentación mínima común entre todas las líneas.

---

## 2. Project Definition

Permite dar una descripción general del proyecto.

```dbml
Project project_name {
  database_type: 'PostgreSQL'
  Note: 'Descripción del proyecto'
}
```

### Propiedades del Project

| Propiedad | Descripción |
|---|---|
| `database_type` | Tipo de base de datos (`'PostgreSQL'`, `'MySQL'`, `'MSSQL'`, etc.) |
| `Note` | Nota descriptiva del proyecto (soporta multilínea) |

### Project con Note multilínea

```dbml
Project DBML {
  Note: '''
  # Mi Base de Datos
  Descripción del proyecto.

  ## Beneficios
  * Simple y legible
  * Agnóstico a la base de datos
  '''
}
```

---

## 3. Schema Definition

Un nuevo schema se define automáticamente cuando contiene alguna tabla o enum.

```dbml
// Tabla en el schema "core"
Table core.user {
  ...
}

// Enum en el schema "v2"
enum v2.job_status {
  ...
}
```

**Regla:** si se omite `schema_name`, el elemento pertenece al schema `public` por defecto.

---

## 4. Table Definition

### Sintaxis básica

```dbml
// Tabla en schema público (por defecto)
Table table_name {
  column_name column_type [column_settings]
}

// Tabla en un schema específico
Table schema_name.table_name {
  column_name column_type [column_settings]
}
```

### Table Alias

Permite usar un alias corto para referenciar la tabla en relaciones.

```dbml
Table very_long_user_table as U {
  ...
}

Ref: U.id < posts.user_id
```

### Table Settings

Los settings de tabla se colocan en corchetes después del nombre:

```dbml
Table users [headercolor: #3498DB] {
  ...
}
```

### Reglas de nomenclatura

- `column_name` puede ser texto plano o entrecomillado: `"column name"`
- `column_type` no puede contener espacios; si los tiene, usar comillas dobles: `"double precision"`
- Tipos con paréntesis son soportados: `decimal(1,2)`, `varchar(255)`

---

## 5. Column Definition

### Sintaxis

```dbml
Table buildings {
  address varchar(255) [unique, not null, note: 'incluir número de unidad']
  id integer [pk, unique, default: 123, note: 'Número']
}
```

### Column Settings

| Setting | Descripción |
|---|---|
| `primary key` / `pk` | Marca la columna como clave primaria |
| `null` | Permite valores nulos (comportamiento por defecto si se omite) |
| `not null` | No permite valores nulos |
| `unique` | Marca la columna como única |
| `default: value` | Valor por defecto (ver sección Default Value) |
| `increment` | Auto-incremento |
| `` check: `expr` `` | Expresión de check para la columna (puede haber múltiples) |
| `note: 'texto'` | Nota descriptiva de la columna |
| `ref: > tabla.col` | Relación inline (ver sección Relationships) |

> **Workaround:** Para settings no soportados, se pueden agregar al tipo de columna: `id "bigint unsigned" [pk]`

### Default Value

| Tipo | Sintaxis | Ejemplo |
|---|---|---|
| Número | Sin comillas | `default: 123` / `default: 123.456` |
| Cadena | Comillas simples | `default: 'direct'` |
| Expresión SQL | Backticks | `` default: `now()` `` |
| Booleano | Sin comillas | `default: false` / `default: true` |
| Null | Sin comillas | `default: null` |

```dbml
Table users {
  id integer [primary key]
  username varchar(255) [not null, unique]
  full_name varchar(255) [not null]
  gender varchar(1) [not null]
  source varchar(255) [default: 'direct']
  created_at timestamp [default: `now()`]
  rating integer [default: 10]
}
```

---

## 6. Check Definition

Permite definir restricciones de check sobre una o múltiples columnas.

### Check en columna (inline)

```dbml
Table users {
  age integer [check: `age >= 0`]
}
```

### Check en bloque (multi-columna)

```dbml
Table users {
  id integer
  wealth integer
  debt integer

  checks {
    `debt + wealth >= 0` [name: 'chk_positive_money']
  }
}
```

### Check Settings

| Setting | Descripción |
|---|---|
| `name` | Nombre del constraint de check |

---

## 7. Index Definition

### Sintaxis

```dbml
Table bookings {
  id integer
  country varchar
  booking_date date
  created_at timestamp

  indexes {
    (id, country) [pk]                              // clave primaria compuesta
    created_at [name: 'created_at_index', note: 'Fecha']
    booking_date
    (country, booking_date) [unique]
    booking_date [type: hash]
    (`id*2`)                                        // índice con expresión
    (`id*3`, `getdate()`)                           // índice compuesto con expresiones
    (`id*3`, id)                                    // expresión + columna
  }
}
```

### Tipos de índice

| Tipo | Equivalente SQL generado |
|---|---|
| Columna simple con nombre | `CREATE INDEX created_at_index ON users (created_at)` |
| Columna compuesta | `CREATE INDEX ON users (created_at, country)` |
| Con expresión | `CREATE INDEX ON films (first_name + last_name)` |
| Compuesto con expresión | `CREATE INDEX ON users (country, (lower(name)))` |

### Index Settings

| Setting | Descripción |
|---|---|
| `type` | Tipo de índice: `btree` (defecto), `hash` |
| `name` | Nombre del índice |
| `unique` | Índice único |
| `pk` | Clave primaria |
| `note` | Nota descriptiva del índice |

---

## 8. Relationships & Foreign Keys

### Tipos de relación

| Operador | Tipo | Ejemplo |
|---|---|---|
| `<` | Uno a muchos | `users.id < posts.user_id` |
| `>` | Muchos a uno | `posts.user_id > users.id` |
| `-` | Uno a uno | `users.id - user_infos.user_id` |
| `<>` | Muchos a muchos | `authors.id <> books.id` |

> Las relaciones **zero-to-(one/many)** se detectan automáticamente combinando el operador de relación con la constraint de nulabilidad de la columna.

### 3 Formas de definir relaciones

**Forma larga:**
```dbml
Ref nombre_opcional {
  schema1.tabla1.columna1 < schema2.tabla2.columna2
}
```

**Forma corta:**
```dbml
Ref nombre_opcional: schema1.tabla1.columna1 < schema2.tabla2.columna2
```

**Forma inline (dentro de la columna):**
```dbml
Table posts {
  id integer
  user_id integer [ref: > users.id]   // muchos-a-uno
}
```

### Relaciones con nulabilidad (zero-to-many)

```dbml
Table follows {
  following_user_id int [ref: > users.id]          // many-to-zero
  followed_user_id int [ref: > users.id, null]     // many-to-zero
}

Table posts {
  id int [pk]
  user_id int [ref: > users.id, not null]          // many-to-one
}
```

### Claves foráneas compuestas

```dbml
Ref: merchant_periods.(merchant_id, country_code) > merchants.(id, country_code)
```

### Relaciones entre schemas

```dbml
Table core.users {
  id integer [pk]
}

Table blogging.posts {
  id integer [pk]
  user_id integer [ref: > core.users.id]
}

// o forma corta
Ref: blogging.posts.user_id > core.users.id
```

### Relationship Settings

```dbml
// forma corta
Ref: products.merchant_id > merchants.id [delete: cascade, update: no action]

// forma larga
Ref {
  products.merchant_id > merchants.id [delete: cascade, update: no action]
}
```

| Setting | Valores posibles |
|---|---|
| `delete` | `cascade`, `restrict`, `set null`, `set default`, `no action` |
| `update` | `cascade`, `restrict`, `set null`, `set default`, `no action` |
| `color` | Código hex: `#rgb` o `#rrggbb` |

> **Nota:** Los settings y nombres de relación **no están soportados** en la forma inline.

### One-to-one: orden importa

- En forma larga/corta: la **segunda columna** es la clave foránea.
  - `users.id - user_infos.user_id` → `user_infos.user_id` es el FK.
- En forma inline: la columna que tiene `ref` es la clave foránea.

### Many-to-many

Dos enfoques:

```dbml
// Opción 1: relación directa many-to-many
Ref: authors.id <> books.id

// Opción 2: tabla intermedia con dos many-to-one
Table author_books {
  author_id int [ref: > authors.id]
  book_id int [ref: > books.id]
}
```

---

## 9. Enum Definition

```dbml
// Enum en schema público
enum job_status {
  created [note: 'Esperando ser procesado']
  running
  done
  failure
}

// Enum en schema específico
enum v2.job_status {
  ...
}

// Usar el enum en una tabla
Table jobs {
  id integer
  status job_status
  status_v2 v2.job_status
}
```

### Valores con espacios o caracteres especiales

```dbml
enum grade {
  "A+"
  "A"
  "A-"
  "Not Yet Set"
}
```

---

## 10. TablePartial

Permite definir conjuntos reutilizables de campos, settings e índices, inyectables en múltiples tablas con el prefijo `~`.

### Definir un partial

```dbml
TablePartial partial_name [table_settings] {
  field_name field_type [field_settings]
  indexes {
    (column_name) [index_settings]
  }
}
```

### Usar un partial

```dbml
Table table_name {
  ~partial_name
  field_name field_type
  ~another_partial
}
```

### Ejemplo completo

```dbml
TablePartial base_template [headerColor: #ff0000] {
  id int [pk, not null]
  created_at timestamp [default: `now()`]
  updated_at timestamp [default: `now()`]
}

TablePartial soft_delete_template {
  delete_status boolean [not null]
  deleted_at timestamp [default: `now()`]
}

TablePartial email_index {
  email varchar [unique]

  indexes {
    email [unique]
  }
}

Table users {
  ~base_template
  ~email_index
  name varchar
  ~soft_delete_template
}
```

Resultado final equivalente:

```dbml
Table users [headerColor: #ff0000] {
  id int [pk, not null]
  created_at timestamp [default: `now()`]
  updated_at timestamp [default: `now()`]
  email varchar [unique]
  name varchar
  delete_status boolean [not null]
  deleted_at timestamp [default: `now()`]

  indexes {
    email [unique]
  }
}
```

### Resolución de conflictos entre partials

1. **Definición local en la tabla** → prioridad más alta, sobreescribe los partials.
2. **Último partial inyectado** → si hay conflicto entre partials, gana el último en el orden de declaración.

---

## 11. Data Sample (Records)

Permite definir datos de muestra directamente en el esquema DBML, útil para documentación y testing.

### Fuera de la tabla (explicit columns)

```dbml
Table users {
  id int [pk]
  name varchar
  email varchar
}

records users(id, name, email) {
  1, 'Alice', 'alice@example.com'
  2, 'Bob', 'bob@example.com'
}
```

### Dentro de la tabla

```dbml
// Con lista de columnas explícita
Table posts {
  id int [pk]
  title varchar
  published boolean

  records (id, title, published) {
    1, 'First Post', true
    2, 'Second Post', false
  }
}

// Con lista de columnas implícita (usa el orden de definición)
Table comments {
  id int [pk]
  user_id int [ref: > users.id]
  post_id int [ref: > posts.id]
  title string

  records {
    1, 2, 1, 'First comment of first post'
  }
}
```

> **Restricción:** Cada tabla puede tener un único bloque `records`. No se pueden definir bloques duplicados.

### Tipos de datos en Records

| Tipo | Sintaxis | Ejemplos |
|---|---|---|
| Strings | Comillas simples; escape con `\'` | `'Hello World'`, `'It\'s fine'` |
| Números | Entero o decimal, con o sin comillas | `42`, `3.14`, `-100`, `1.5e10` |
| Booleanos | Case-insensitive | `true`, `false`, `'Y'`, `'N'`, `'T'`, `'F'`, `1`, `0` |
| Null | Literal `null`, string vacío (no-string), o campo vacío | `null`, `''`, `, ,` |
| Timestamps | Comillas simples, formato ISO 8601 | `'2024-01-15 10:30:00'`, `'2024-01-15'` |
| Enum values | Constante o string literal | `Status.active`, `'inactive'` |
| Expresiones | Backticks (desactiva type-check estático) | `` `now()` ``, `` `uuid_generate_v4()` `` |

### Ejemplo con tipos mixtos

```dbml
enum Status {
  active
  inactive
  pending
}

Table users {
  id int
  name varchar
  age int
  status Status
  created_at timestamp
}

records users(id, name, age, status, created_at) {
  1, 'Alice', 30, Status.active, '2024-01-15 10:30:00'
  2, 'Bob', null, 'inactive', `now()`
  3, 'Charlie', , Status.pending, '2024-01-15'
}
```

---

## 12. Notas (Notes)

Las notas son metadatos descriptivos para elementos del esquema. No tienen equivalente SQL directo.

### Dos formas de sintaxis

```dbml
// Forma inline
Note: 'Esta es una nota'

// Forma de bloque
Note {
  'Esta es una nota'
}
```

### Project Notes

```dbml
Project DBML {
  Note: '''
  # DBML
  Descripción del proyecto en Markdown.
  '''
}
```

### Table Notes

```dbml
Table users {
  id int [pk]
  name varchar

  Note: 'Almacena datos de usuario'
}
```

### Column Notes

```dbml
Table orders {
  status varchar [
    note: '''
    💸 1 = processing,
    ✔️ 2 = shipped,
    ❌ 3 = cancelled,
    😔 4 = refunded
    ''']
}
```

### Index Notes

```dbml
indexes {
  created_at [name: 'created_at_index', note: 'Fecha de creación']
}
```

### TableGroup Notes

```dbml
TableGroup e_commerce [note: 'Tablas del sistema de e-commerce'] {
  merchants
  countries

  // o también
  Note: 'Tablas del sistema de e-commerce'
}
```

---

## 13. Sticky Notes

Notas flotantes para agregar al canvas del diagrama (no al esquema en sí).

```dbml
Note single_line_note {
  'Esta es una nota de una línea'
}

Note multiple_lines_note {
  '''
  Esta es una nota multilínea.
  Puede abarcar varias líneas.
  '''
}
```

---

## 14. TableGroup

Permite agrupar tablas relacionadas visualmente en el diagrama.

### Sintaxis básica

```dbml
TableGroup tablegroup_name {
  table1
  table2
  table3
}

// Ejemplo
TableGroup e_commerce {
  merchants
  countries
  orders
}
```

> `TableGroup` es case-insensitive.

### TableGroup con Settings

```dbml
TableGroup e_commerce [note: 'Sistema de e-commerce', color: #3498DB] {
  merchants
  countries
}
```

### TableGroup Settings

| Setting | Descripción |
|---|---|
| `note` | Nota descriptiva del grupo |
| `color` | Color de fondo del grupo (hex: `#rgb` o `#rrggbb`) |

---

## 15. Colores

Los colores se especifican como códigos hex en formato corto o completo: `#rgb` o `#rrggbb`.

### Color de cabecera de tabla

```dbml
Table users [headercolor: #3498DB] {
  id integer [primary key]
  username varchar(255) [not null, unique]
}
```

### Color de línea de relación

```dbml
// Forma corta
Ref: products.merchant_id > merchants.id [color: #79AD51]

// Forma larga
Ref {
  products.merchant_id > merchants.id [color: #79AD51]
}
```

### Color de TableGroup

```dbml
TableGroup e_commerce [color: #3498DB] {
  merchants
  countries
}
```

---

## Ejemplo Completo

```dbml
Project ecommerce {
  database_type: 'PostgreSQL'
  Note: 'Sistema de e-commerce'
}

// Enums
enum order_status {
  pending [note: 'Pendiente de procesar']
  processing
  shipped
  delivered
  cancelled
}

// Partials reutilizables
TablePartial timestamps {
  created_at timestamp [not null, default: `now()`]
  updated_at timestamp [not null, default: `now()`]
}

// Tablas
Table users [headercolor: #3498DB] {
  id integer [pk, increment]
  username varchar(255) [not null, unique]
  email varchar(255) [not null, unique]
  full_name varchar(255)
  ~timestamps

  Note: 'Tabla de usuarios del sistema'

  indexes {
    email [unique, name: 'users_email_idx']
  }
}

Table products {
  id integer [pk, increment]
  name varchar(255) [not null]
  price decimal(10,2) [not null, default: 0]
  stock integer [not null, default: 0, check: `stock >= 0`]
  merchant_id integer [not null]
  ~timestamps
}

Table merchants {
  id integer [pk, increment]
  name varchar(255) [not null]
  country_code varchar(2) [not null]
  ~timestamps
}

Table orders {
  id integer [pk, increment]
  user_id integer [not null]
  status order_status [not null, default: 'pending']
  total decimal(10,2) [not null]
  ~timestamps
}

Table order_items {
  id integer [pk, increment]
  order_id integer [not null]
  product_id integer [not null]
  quantity integer [not null, check: `quantity > 0`]
  unit_price decimal(10,2) [not null]
}

// Relaciones
Ref: products.merchant_id > merchants.id [delete: cascade]
Ref: orders.user_id > users.id [delete: restrict]
Ref: order_items.order_id > orders.id [delete: cascade]
Ref: order_items.product_id > products.id [delete: restrict]

// Grupos
TableGroup core [color: #3498DB] {
  users
  merchants
}

TableGroup commerce [color: #2ECC71] {
  products
  orders
  order_items
}
```

---

## Fuentes

- [DBML Core Syntax](https://dbml.dbdiagram.io/docs)
- [Enrichment & Visualization](https://dbml.dbdiagram.io/syntax/enrichment-visualization)
- [Language Reference](https://dbml.dbdiagram.io/syntax/language-reference)
- [dbdiagram.io Docs](https://docs.dbdiagram.io/)
