# Noise DBML extension for Visual Studio Code

Noise DBML is a tool designed for visualizing and editing database diagrams using the DBML (Database Markup Language) standard. This extension allows developers to design data schemas declaratively, obtaining an interactive graphical representation updated in real-time.

## Key Capabilities

* Interactive visualization of ER (Entity-Relationship) diagrams based on .dbml files.
* Bidirectional synchronization between code and visual representation.
* Full support for standard DBML syntax, including tables, relationships, schemas, and custom types.
* Logical grouping of tables using TableGroups to organize complex architectures.
* Aesthetic customization of nodes through header colors and themes.
* Advanced index management, including composite indices, unique constraints, and expressions.
* Exporting diagrams to image formats for documentation.
* Seamless integration with the file explorer and context menus in Visual Studio Code.

## Features and Supported Syntax

The extension extensively supports the DBML specification:

* **Tables and Nodes**: Table definitions with simple names or schemas (`schema.table`). Supports aliases and quoted identifiers for names with spaces.
* **Table Components**: Varied data types, primary keys (`pk`, `primary key`), autoincrementing fields (`increment`), nullability (`not null`, `null`), default values, and integrated notes.
* **Relationships (References)**: Support for One-to-One (`-`), One-to-Many (`>`), and Many-to-One (`<`) relationships. Includes referential integrity configuration (`on delete`, `on update`).
* **Advanced Indexes**: Supports single-column, composite, and unique (`unique`) indexes, along with additional settings like index type (BTree, Hash) and custom names.
* **Visual Grouping**: Use of `TableGroup` to group related tables and improve the visual organization of the diagram.
* **Enums**: Definition of enumerated types for stricter data validation in the design.
* **Annotations**: Table and field notes, both single-line and multi-line blocks.
* **Customization**: Adjustment of table header colors using the `headercolor` setting.

## Available Commands

* **Noise DBML: See Diagram**: Opens the interactive diagram view for the active .dbml file.
* **Select Auto-arrange Algorithm**: Allows switching between different methods for automatically organizing nodes on the canvas (Horizontal, Vertical, Circular).

## Ideal Syntax Example

The following example consolidates the syntax elements that the Noise DBML extension processes and renders, showcasing its robustness and variety of features.

```dbml
// ==========================================
// 1. PROJECT CONFIGURATION
// ==========================================

Project "Noise E-commerce" {
  database_type: 'PostgreSQL'
  Note: 'Schema for a modern e-commerce system'
}

// ==========================================
// 2. ENUMERATIONS
// ==========================================

Enum "public"."user_status" {
  active [note: 'Active account']
  inactive
  banned
  deleted
}

// ==========================================
// 3. TABLE GROUPING (Visual Categories)
// ==========================================

TableGroup "Identity & Access" {
  users
  profiles
  "auth_logs"
}

TableGroup "Inventory & Sales" {
  products
  categories
  order_items
}

// ==========================================
// 4. TABLE DEFINITIONS
// ==========================================

Table users as U [headercolor: #3498db] {
  id uuid [primary key, default: `uuid_generate_v4()`]
  username varchar(50) [not null, unique]
  email varchar(255) [not null, unique]
  status "public"."user_status" [default: 'active']
  created_at timestamp [default: `now()`]
  
  Note: 'Core user credentials and account status'

  indexes {
    username [name: "idx_users_username"]
    (email, status) [unique]
    created_at [type: hash]
  }
}

Table profiles [headercolor: #2980b9] {
  user_id uuid [pk, ref: - U.id]
  full_name "varchar"
  bio text
  avatar_url varchar [note: 'URL to S3 bucket']
  
  Note {
    'Detailed user information.'
    'Stored separately for performance.'
  }
}

Table "public"."categories" [headercolor: #27ae60] {
  id int [pk, increment]
  name varchar [not null]
  parent_id int [note: 'Hierarchical categories']
}

Table products [headercolor: #2ecc71] {
  id int [pk, increment]
  category_id int [not null]
  name varchar(200) [not null]
  price decimal(10,2) [not null]
  stock int [default: 0]

  indexes {
    (category_id, price)
    `lower(name)` [type: btree] // Expression-based index
  }
}

Table "auth_logs" {
  id bigint [pk, increment]
  user_id uuid
  action varchar
  occurred_at timestamp
}

Table order_items {
  order_id int
  product_id int
  quantity int [default: 1]

  indexes {
    (order_id, product_id) [pk]
  }
}

// ==========================================
// 5. RELATIONSHIPS (External References)
// ==========================================

// Product belongs to a category (N:1)
Ref: products.category_id > "public"."categories".id [delete: cascade, update: no action]

// Recursive relationship for category parents
Ref: "public"."categories".parent_id > "public"."categories".id

// Items link to products
Ref: order_items.product_id > products.id

// Linking logs to users
Ref: "auth_logs".user_id > users.id
```

## Extension Usage

To start using Noise DBML, simply open any file with the .dbml extension in Visual Studio Code. You can activate the diagram visualization via the context explorer menu ("Noise DBML: See Diagram") or by using the button in the editor's title bar.
