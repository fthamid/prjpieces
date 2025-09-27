# Pièces Commerciales (Commercial Documents)

## 📋 Project Overview

**Pièces Commerciales** is a French web-based application for creating and managing commercial documents including quotes (devis), delivery notes (bon de livraison), invoices (factures), and credit notes (avoir). The application provides an interactive interface for generating professional commercial documents with automatic tax calculations.

## ✨ Features

- **Multi-document Support**: Create quotes, delivery notes, invoices, and credit notes
- **Client Management**: Complete customer database with search and filtering
- **Product Catalog**: Comprehensive product management with categories and stock tracking
- **Dynamic Line Items**: Add/remove product lines with automatic calculations
- **Tax Calculations**: Automatic VAT (TVA) calculations with configurable tax rates
- **Real-time Updates**: Live calculation updates as you modify quantities and prices
- **Modern UI Design**: Clean, professional interface with modern cards and layouts
- **Interactive Interface**: Built with Alpine.js for dynamic user interactions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Number Formatting**: French-style number formatting with proper currency display
- **Professional Printing**: Print-ready documents with French legal text and number-to-text conversion
- **Top Action Bar**: Easy access to print, save, and add functions in the header
- **Utility Tools**: Built-in calculator, currency converter, and system utilities
- **Single Page Application**: Smooth navigation with AJAX page loading

## 🏗️ Project Structure

```
prjpieces/
├── assets/                 # Static resources
│   ├── css/
│   │   └── styles.css      # Custom CSS styles
│   ├── js/
│   │   └── index.js        # Core JavaScript functionality
│   └── images/             # Images, icons, and graphics
│       ├── favicon.ico
│       ├── delete-19.png
│       └── side_icon.svg
├── components/             # Reusable components
│   └── navigation.html     # Shared navigation component
├── pages/                  # Application pages (AJAX loaded)
│   ├── apropos.html        # About page
│   ├── clients.html        # Client management
│   ├── pieces.html         # Commercial documents (AJAX version)
│   ├── produits.html       # Product catalog
│   ├── profil.html         # User profile
│   └── utilitaires.html    # Utility tools
├── index.html              # Main SPA entry point
├── pieces-standalone.html  # Standalone pieces page (full Alpine.js support)
├── DEVELOPMENT.md          # Developer documentation
└── README.md               # Project documentation
```

## 🔧 Key Files Description

### Core Application Files

- **`index.html`**: Main entry point with homepage, navigation, and SPA container. Features hero section, feature cards, and AJAX navigation setup.

- **`assets/js/index.js`**: Core JavaScript file containing:
  - Alpine.js data components (`objentete`, `objline`, `objbox`)
  - Number formatting functions (`formatNumber`, `str2number`)
  - Tax calculation logic
  - Dynamic row management (add/delete lines)
  - Real-time total calculations

- **`assets/css/styles.css`**: Custom CSS containing:
  - Design system variables
  - Button and form styling
  - Grid and table layouts
  - Responsive design utilities

### Application Pages

- **`pages/pieces.html`**: Commercial document creation interface with grid-based layout (quotes, invoices, delivery notes, credit notes)
- **`pages/clients.html`**: Complete client management system with CRUD operations, search, and filtering
- **`pages/produits.html`**: Product catalog with categories, stock management, and product cards
- **`pages/utilitaires.html`**: Utility tools including calculator, currency converter, backup/export functions, and system information
- **`pages/apropos.html`**: About page with company information, features, and contact details
- **`pages/profil.html`**: User profile management with personal information, preferences, and security settings

### Components and Assets

- **`components/navigation.html`**: Reusable navigation component
- **`assets/images/`**: Static assets including favicon, icons, and graphics
- **`DEVELOPMENT.md`**: Comprehensive developer documentation

## 🚀 Getting Started

### Prerequisites
- Modern web browser with JavaScript enabled
- No server-side dependencies required (pure frontend application)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd prjpieces
   ```

2. Serve the application (recommended to avoid CORS issues):
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve .

   # Using PHP
   php -S localhost:8000

   # Then open http://localhost:8000
   ```

   Alternatively, you can open `index.html` directly in your browser, but some features may not work due to CORS restrictions.

### Usage

#### Navigation
The application uses a single-page architecture with AJAX navigation. Click on menu items to load different sections:
- **Accueil**: Homepage with feature overview
- **Produits**: Product catalog management
- **Clients**: Customer relationship management
- **Pièces**: Create commercial documents
- **Utilitaires**: Various utility tools

#### Creating Commercial Documents
1. **Navigate to "Pièces"** from the main menu (opens standalone page)
2. **Document Header**: Fill in document details
   - Select document type (Devis, Bon de Livraison, Facture, Avoir)
   - Enter document number and date
   - Add client information (name, address, references)
3. **Line Items**: Add products/services
   - Click "+" button to add new lines
   - Enter article description, quantity, and unit price
   - Amounts are calculated automatically
   - Use delete icon to remove lines
4. **Review Totals**: Automatic calculations display
   - Total TTC (Tax included)
   - TVA amount (VAT)
   - Total HT (Tax excluded)
5. **Print Document**: Click the print button to generate a professional document
   - Includes all document information and line items
   - Adds French legal footer: "Arrêté la présente [type] à la somme de : [amount] ([amount in words])"
   - Automatic number-to-words conversion in French
   - Print-optimized A4 layout

**Note**: The commercial documents feature uses a modern, redesigned standalone page (`pieces-standalone.html`) with:
- **Professional top navigation bar** with logo and action buttons
- **Card-based layout** for better organization and visual hierarchy
- **Sidebar with document info** and real-time summary statistics
- **Modern table design** with hover effects and inline editing
- **Responsive grid layout** that adapts to all screen sizes

#### Managing Clients and Products
- Use the dedicated **Clients** and **Produits** sections
- Full CRUD operations with modal interfaces
- Search and filter capabilities
- Export functionality available

## 🛠️ Technology Stack

- **Frontend Framework**: Vanilla HTML5/CSS3/JavaScript
- **CSS Framework**: Tailwind CSS 4.x (via CDN)
- **JavaScript Framework**: Alpine.js 3.x (reactive components)
- **Alpine.js Plugins**:
  - `@alpinejs/mask` (input masking)
  - `@alpinejs/sort` (drag & drop sorting)
  - `@imacrayon/alpine-ajax` (AJAX navigation)
- **Icons**: Custom SVG icons and Icons8 integration
- **Architecture**: Single Page Application (SPA)
- **Styling**: CSS Grid, Flexbox, and Tailwind utilities

## 🧮 Core Functionality

### Tax Calculations
- Configurable VAT rate (default 20%)
- Automatic calculation of HT (excluding tax) and TTC (including tax)
- Support for discounts and remittances
- French number formatting with space thousands separator

### Dynamic Interface
- Real-time updates using Alpine.js reactivity
- Sortable table rows
- Input masking for currency fields
- Responsive design for different screen sizes

## 🤝 Contributing

See [DEVELOPMENT.md](./DEVELOPMENT.md) for detailed development guidelines.

### Quick Start
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Follow the coding conventions in DEVELOPMENT.md
4. Test your changes thoroughly
5. Commit your changes (`git commit -am 'feat: add new feature'`)
6. Push to the branch (`git push origin feature/new-feature`)
7. Create a Pull Request

### Development Standards
- French comments and documentation
- Semantic commit messages
- Alpine.js for reactivity
- Tailwind CSS for styling
- Mobile-first responsive design

## 🔍 Application Features

### Commercial Document Management
- **Document Types**: Devis (Quotes), Factures (Invoices), Bons de Livraison (Delivery Notes), Avoirs (Credit Notes)
- **Modern Interface**: Card-based design with intuitive layout and top action bar
- **Automatic Calculations**: Real-time VAT, totals, and line item calculations with live summary
- **Flexible Tax Rates**: Configurable VAT percentages
- **Professional Printing**: A4-optimized print layout with French legal requirements
- **Number Conversion**: Automatic conversion of amounts to French text (required by French law)
- **Legal Compliance**: Includes mandatory "Arrêté la présente" clause with amount in words
- **Smart Table**: Modern table design with hover effects, inline editing, and sortable rows

### Client & Product Management
- **Client Database**: Complete customer information management
- **Product Catalog**: Organized by categories with stock tracking
- **Search & Filter**: Advanced filtering capabilities
- **CRUD Operations**: Full create, read, update, delete functionality

### Utility Tools
- **Calculator**: Built-in calculator for quick calculations
- **Currency Converter**: Multi-currency conversion tool
- **Data Management**: Backup and export functionality
- **System Information**: Application statistics and maintenance tools

### User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile
- **AJAX Navigation**: Fast page transitions without full reloads
- **Real-time Updates**: Instant feedback on user actions
- **French Localization**: Complete French interface and business logic

## 📝 Notes

- Application is designed for French commercial document standards
- All text and labels are in French
- Currency formatting follows French conventions (spaces as thousands separators)
- VAT calculations are based on French tax regulations
- Data is stored in browser memory (no backend database required)

## 🐛 Known Issues

- **Performance**: Large datasets may impact performance (100+ items)
- **Browser Support**: Not compatible with Internet Explorer
- **Mobile**: Some modal interfaces need optimization for very small screens
- **Offline**: No offline functionality currently implemented
- **Data Persistence**: All data is stored in memory (resets on page refresh)
- **AJAX Loading**: Some Alpine.js components may not fully initialize when loaded via AJAX (use standalone pages for complex interactions)

## 📚 Documentation

- **README.md**: User documentation and project overview
- **DEVELOPMENT.md**: Developer guide and technical documentation
- **components/**: Reusable UI components
- **pages/**: Individual application pages

## 🔮 Roadmap

### Upcoming Features
- [ ] Data persistence (Local Storage/IndexedDB)
- [ ] PDF export for commercial documents
- [ ] Advanced reporting and analytics
- [ ] Multi-user support
- [ ] API integration capabilities
- [ ] Offline functionality
- [ ] Advanced theming options

## 📄 License

This project appears to be a personal/educational project. Please check with the original author for licensing information.

---

**Built with ❤️ using Alpine.js and Tailwind CSS**