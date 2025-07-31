# Semantic Color System

Sistem warna semantic yang konsisten untuk seluruh aplikasi portfolio.

## 🎨 Color Variables

### Background Colors
- `--color-background`: Light background (default: #F2F1EF)
- `--color-background-dark`: Dark background (default: dark charcoal)
- `--color-foreground`: Dark text (default: dark gray)
- `--color-foreground-light`: Light text (default: #F2F1EF)

### Semantic Colors
- `--color-primary`: Brand blue (224 60% 57%)
- `--color-primary-foreground`: Light text on primary (#F2F1EF)
- `--color-secondary`: Purple secondary (274 60% 57%)
- `--color-secondary-foreground`: Light text on secondary (#F2F1EF)
- `--color-accent`: Light accent (#F2F1EF)
- `--color-accent-foreground`: Dark text on accent
- `--color-destructive`: Red for errors (0 84% 60%)
- `--color-destructive-foreground`: Light text on destructive (#F2F1EF)

### UI Colors
- `--color-muted`: Muted gray (210 8% 64%)
- `--color-muted-foreground`: Muted text (210 6% 46%)
- `--color-card`: Light card background (#F2F1EF)
- `--color-card-foreground`: Dark text on cards
- `--color-border`: Border color (210 12% 90%)
- `--color-input`: Input background
- `--color-ring`: Focus ring color

## 🚀 Usage

### Background Classes
```css
.bg-background          /* Light background */
.bg-background-dark     /* Dark background */
.bg-foreground          /* Dark background */
.bg-foreground-light    /* Light background */
.bg-primary            /* Brand blue */
.bg-secondary          /* Purple */
.bg-accent             /* Light (#F2F1EF) */
.bg-destructive        /* Red */
.bg-muted              /* Gray */
.bg-card               /* Light card (#F2F1EF) */
```

### Text Classes
```css
.text-foreground        /* Dark text */
.text-foreground-light  /* Light text */
.text-primary          /* Brand blue */
.text-secondary        /* Purple */
.text-accent           /* Light (#F2F1EF) */
.text-destructive      /* Red */
.text-muted            /* Gray */
.text-muted-foreground /* Muted text */
.text-card-foreground  /* Dark text on cards */
```

### Border Classes
```css
.border-primary        /* Brand blue */
.border-secondary      /* Purple */
.border-accent         /* Light (#F2F1EF) */
.border-destructive    /* Red */
.border-muted          /* Gray */
.border-card           /* Light (#F2F1EF) */
.border-border         /* Default border */
```

## 🌙 Dark Mode

Dark mode otomatis mengubah warna-warna berikut:
- `--color-background` → Dark
- `--color-foreground` → Light
- `--color-card` → Dark card
- `--color-card-foreground` → Light text
- `--color-border` → Dark border
- `--color-input` → Dark input

## 📝 Examples

### Hero Section
```tsx
<section className="bg-background-dark">
  <h1 className="text-foreground-light">Adhara Eka</h1>
  <div className="bg-card text-card-foreground">Location Card</div>
</section>
```

### Button
```tsx
<button className="bg-primary text-primary-foreground">
  Click Me
</button>
```

### Card
```tsx
<div className="bg-card border-border text-card-foreground">
  Card Content
</div>
```

## 🔧 Customization

Untuk menambah warna baru, tambahkan di `globals.css`:

```css
:root {
  --color-custom: 200 50% 50%;
  --color-custom-foreground: 40 5% 95%;
}

/* Utility classes */
.bg-custom { background-color: hsl(var(--color-custom)); }
.text-custom { color: hsl(var(--color-custom)); }
.border-custom { border-color: hsl(var(--color-custom)); }
``` 