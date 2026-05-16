<!-- markdownlint-disable MD041 -->

<div align="center">
  <h1><a href="https://open-source-uom.github.io/UniMate/"><img alt="UniMate" src="unimate.png" width=600/></a></h1>

![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)
![Website](https://img.shields.io/website?url=https://tuxmate.abusov.com&style=for-the-badge)
![Maintained](https://img.shields.io/badge/Maintained-Yes-green?style=for-the-badge)
[![GitHub issues](https://img.shields.io/github/issues/abusoww/tuxmate?color=red&style=for-the-badge)](https://github.com/abusoww/tuxmate/issues)
[![GitHub stars](https://img.shields.io/github/stars/abusoww/tuxmate?color=green&style=for-the-badge)](https://github.com/abusoww/tuxmate/stargazers)
[![GitHub license](https://img.shields.io/github/license/abusoww/tuxmate?color=yellow&style=for-the-badge)](https://github.com/abusoww/tuxmate/blob/main/LICENSE)

</div>

## 🐧 Το μόνο "φιλαράκι" που χρειάζεστε για εγκαταστάση

Το **UniMate** είναι ένα απλό διαδικτυακό εργαλείο που δημιουργεί σενάρια εγκατάστασης για οποιαδήποτε διανομή Linux.Επιλέξτε τις εφαρμογές σας, αντιγράψτε την εντολή, και τελειώσατε!

Καινούργια εγκατάσταση; Νέος υπολογιστής; Δεν θυμάστε τα ονόματα όλων των πακέτων; Ιτσ οκαυ όλοι έχουμε βρεθεί σε αυτή τη θέση.

## 📦 Υποστηριζόμενοι διαχειριστές πακέτων

- Ubuntu / Debian (apt)
- Arch Linux (pacman + AUR)
- Fedora (dnf)
- openSUSE (zypper)
- Nix (declarative config)
- Flatpak
- Snap
- Homebrew (macOS + Linux)

## ✨ Χαρακτηριστικά

### **Κατάλογος Εφαρμογών**  
Πάνω από 180 εφαρμογές σε 15 κατηγορίες: προγράμματα περιήγησης, επικοινωνία, εργαλεία ανάπτυξης, τερματικά, πολυμέσα, δημιουργικό λογισμικό, παιχνίδια, γραφείο, VPN/δίκτυα, ασφάλεια και άλλα.

### **Δημιουργία έξυπνων σεναρίων**  
- Εντοπίζει τα ήδη εγκατεστημένα πακέτα
- Διαχειρίζεται αυτόματα τα πακέτα AUR στο Arch
- **Ανίχνευση μη ελεύθερου λογισμικού Nix**: Προειδοποιεί για τη σωστή διαμόρφωση των πακέτων που δεν είναι ελεύθερα (Discord,Spotify κ.λπ.)
- Διαχωρισμός Homebrew formula/cask για macOS
- Παράλληλη εγκατάσταση για Flatpak
- Επανάληψη δοκιμής σύνδεσης με εκθετική αναμονή
- Γραμμές προόδου με εκτιμώμενο χρόνο ολοκλήρωσης
- Έγχρωμες αναφορές εξόδου και συνοπτικές αναφορές





<details>
<summary><h2>💻 Ανάπτυξη</h2></summary>

```bash
npm install
npm run dev
```

Ανοίξτε [http://localhost:3000](http://localhost:3000)

### Buid

```bash
npm run build
npm start
```

</details>


<details>
<summary><h2>🗂️ Δομή του προτζεκτ</h2></summary>

```
src/
├── app/                    # Δρομολογητής εφαρμογών Next.js
│   ├── page.tsx            # Στοιχεία της κεντρικής σελίδας
│   ├── layout.tsx          # Διάταξη ριζικού φακέλου με ετικέτες meta
│   ├── globals.css         # Στυλ Tailwind
│   ├── error.tsx           # Όριο σφάλματος
│   └── favicon.ico         # Εικονίδιο ιστότοπου
├── components/
│   ├── app/                # Κάρτες εφαρμογών & κατηγορίες
│   ├── command/            # Υποσέλιδο εντολών & ρυθμίσεις AUR
│   ├── common/             # Συμβουλές εργαλείων, καταστάσεις φόρτωσης
│   ├── distro/             # Επιλογέας διανομής
│   ├── header/             # Σύνδεσμοι και πληροφορίες της κεφαλίδας
│   ├── search/             # Επικάλυψη αναζήτησης
│   └── ui/                 # Εναλλαγή θέματος
├── hooks/                  # React hooks
│   ├── useLinuxInit.ts     # Διαχείριση κατάστασης της κύριας εφαρμογής
│   ├── useKeyboardNavigation.ts
│   ├── useTheme.tsx
│   ├── useTooltip.ts
│   └── useDelayedTooltip.ts
├── lib/
│   ├── apps/               # Αρχεία εφαρμογών JSON ανά κατηγορία
│   ├── data.ts             # Κατηγορίες, διανομές και ενοποιητής εφαρμογών
│   ├── aur.ts              # Ανίχνευση πακέτων AUR
│   ├── analytics.ts        # Παρακολούθηση Umami
│   ├── utils.ts            # Συναρτήσεις χρησιμότητας
│   ├── generateInstallScript.ts
│   └── scripts/            # Δημιουργοί σεναρίων ανά διανομή
└── __tests__/              # Δοκιμές μονάδων Vitest
```

</details>


<details>
<summary><h2>🐳 Ανάπτυξη Docker</h2></summary>

### Γρήγορη εκκίνηση με το Docker

```bash
# Build the Docker image
docker build -t tuxmate:latest .

# Run the container
docker run -p 3000:3000 tuxmate:latest
```

### Using Pre-built Images

Pre-built Docker images are automatically published to GitHub Container Registry:

```bash
# Pull and run the latest image
docker pull ghcr.io/abusoww/tuxmate:latest
docker run -p 3000:3000 ghcr.io/abusoww/tuxmate:latest

# Or use a specific version
docker pull ghcr.io/abusoww/tuxmate:v1.0.0
docker run -p 3000:3000 ghcr.io/abusoww/tuxmate:v1.0.0
```

### Using Docker Compose (Recommended)

```bash
# Start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

Open [http://localhost:3000](http://localhost:3000)

### Configuration

The Docker container exposes port 3000 by default. You can customize the port mapping:

```bash
docker run -p 8080:3000 tuxmate:latest
```

### Environment Variables

The following environment variables are configured by default:

- `NODE_ENV=production` - Run in production mode
- `PORT=3000` - Application port
- `NEXT_TELEMETRY_DISABLED=1` - Disable Next.js anonymous telemetry

You can override these when running the container:

```bash
docker run -p 3000:3000 \
  -e PORT=3000 \
  -e NEXT_TELEMETRY_DISABLED=1 \
  tuxmate:latest
```

</details>


<details>
<summary><h2>🛠️ Τεχνολογικό περιβάλλον</h2></summary>

- [Next.js](https://nextjs.org/) 16 (App Router)
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Framer Motion](https://www.framer.com/motion/)
- [GSAP](https://gsap.com/)
- [Vitest](https://vitest.dev/) (testing)
- [Lucide React](https://lucide.dev/) (icons)

</details>

### ⌨️ Συντομεύσεις πληκτρολογίου

| Πλήκτρο | Δράση |
|-----|--------|
| `↑` `↓` `←` `→` / `h` `j` `k` `l` | Πλοήγηση στις εφαρμογές |
| `Space` | Επιλογή ή κατάργηση επιλογής εφαρμογής |
| `Esc` | Clear focus |
| `/` | Focus search |
| `y` | Αντιγραφή εντολής εγκατάστασης |
| `d` | Λήψη του σεναρίου εγκατάστασης |
| `t` | Εναλλαγή φωτεινού/σκοτεινού θέματος |
| `c` | Eκκαθάριση όλων των επιλογών |
| `Tab` | Προεπισκόπηση των τρέχων επιλογών |

## 🤝 Συνεισφορά

Δείτε [CONTRIBUTING.md](CONTRIBUTING.md) για τις οδηγίες συνεισφοράς.




<details>
<summary><h4>🔗 Related Projects</h4></summary>
	
- **[UniOS](https://github.com/open-source-uom/UniOS)** – A custom Linux distribution tailored to the need of the modern Greek university
- **[UniBackpack](https://github.com/open-source-uom/UniBackpack)** – A Qt6 downloader for software used by greek universities
- **[UniDesk](https://github.com/open-source-uom/UniDesk)** – Helper app for UniOS written in python/Qt

</details>


<details>
<summary><h4>💳 Χρηματικές συνεισφορές</h4></summary>

Δεν υπάρχει κουτί για φιλοδωρήματα εδώ. Μας αρκεί το γεγονός ότι χρησιμοποιείτε Linux :)

</details>


<div align="right">

## 📜 License
Κάτω από την άδεια [GPL-3.0 License](LICENSE) <br>
Ελεύθερο λογισμικό — μπορείτε να το αναδιανείμετε και να το τροποποιήσετε σύμφωνα με τους όρους της Γενικής Άδειας Δημόσιας Χρήσης GNU.

<p align="center">
	<img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/footers/gray0_ctp_on_line.svg?sanitize=true" />
</p>
