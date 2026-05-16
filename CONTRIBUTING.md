# Συνεισφορά στο UniMate

## Επισκόπηση του έργου

*   `src/lib/apps/*.json`: Κεντρικό μητρώο αιτήσεων (κατηγοριοποιημένο).
*   `src/lib/data.ts`: Κεντρικό μητρώο για διανομές, κατηγορίες και τύπους Typescript.
*   `src/lib/aur-packages.json`: Λίστα επιτρεπόμενων για πακέτα AUR που δεν διαθέτουν τυπικές καταλήξεις.
*   `src/lib/nix-unfree.json`: Μητρώο μη ελεύθερων πακέτων Nix.
*   `src/lib/verified-flatpaks.json`: Αυτόματα δημιουργημένη λίστα επαληθευμένων εφαρμογών του Flathub. **Μην την επεξεργαστείτε.**
*   `src/lib/verified-snaps.json`: Χειροκίνητη λίστα επιτρεπόμενων εκδοτών Snap που έχουν επαληθευτεί.

---

## Ροή εργασιών ανάπτυξης

### Αρχική ρύθμιση

```bash
git clone https://github.com/open-source-uom/UniMate
cd unimate
npm install
npm run dev
```
Η εφαρμογή θα είναι διαθέσιμη στο `http://localhost:3000`.

<a id="running-with-docker"></a>
<details>
<summary>Running with Docker</summary>

You can run the full application using the official Docker image:

```bash
docker run -p 3000:80 ghcr.io/abusoww/tuxmate:latest
```
</details>

<a id="quality-assurance"></a>
<details>
<summary>Διασφάλιση ποιότητας</summary>

Πάντα εκτελείστε τα εξής πριν κάνετε push:
*   `npm run lint`: Ελέγξτε για τυχόν προβλήματα στο στυλ κώδικα.
*   `npm run test`: Εκτελέστε τη σειρά δοκιμών μονάδων.
*   `npm run build`: Επαλήθευση της έκδοσης παραγωγής.
</details>

<a id="verifying-install-scripts"></a>
<details>
<summary>Επαλήθευση των σεναρίων εγκατάστασης</summary>

Για να βεβαιωθείτε ότι τα *σενάρια που δημιουργούνται από το UniMate* λειτουργούν σωστά, εκτελέστε τα σε ένα καθαρό περιβάλλον κοντέινερ. Έτσι αποφεύγετε να προκαλέσετε προβλήματα στο τοπικό σας σύστημα.

1.  Δημιουργήστε ένα σενάριο στο περιβάλλον εργασίας χρήστη του UniMate (Dev mode).
2.  Αντιγράψτε το σενάριο.
3.  Εκτελέστε τις αντίστοιχες εντολές του κοντέινερ διανομής που αναφέρονται παρακάτω και επικολλήστε το σενάριο.

```bash
# Arch Linux
docker run -it --rm archlinux:latest bash -c "pacman -Sy && bash"

# Ubuntu
docker run -it --rm ubuntu:latest bash -c "apt update && bash"

# Fedora
docker run -it --rm fedora:latest bash -c "dnf check-update; bash"
```
</details>

---

## Προσθήκη εφαρμογών

Όλες οι εφαρμογές ορίζονται σε αρχεία JSON για κάθε κατηγορία εντός του [`src/lib/apps/`](src/lib/apps/).

### 1. Υποχρεωτικό ερευνητικό πρωτόκολλο

**ΠΡΕΠΕΙ να επαληθεύσετε κάθε πακέτο από αυτές τις επίσημες πηγές πριν από την υποβολή:**

| Πηγή | Scope | URL |
| :--- | :--- | :--- |
| **Repology** | Global Index | [repology.org](https://repology.org/) |
| **Arch Linux** | Official Repos | [archlinux.org/packages](https://archlinux.org/packages/) |
| **AUR** | User Repo | [aur.archlinux.org](https://aur.archlinux.org/) |
| **Debian** | Official Repos | [packages.debian.org](https://packages.debian.org/) |
| **Ubuntu** | Official Repos | [packages.ubuntu.com](https://packages.ubuntu.com/) |
| **Fedora** | Official Repos | [packages.fedoraproject.org](https://packages.fedoraproject.org/) |
| **OpenSUSE** | Official Repos | [software.opensuse.org](https://software.opensuse.org/) |
| **Nix** | Nixpkgs | [search.nixos.org](https://search.nixos.org/packages) |
| **Flathub** | Flatpaks | [flathub.org](https://flathub.org/) |
| **Snapcraft** | Snaps | [snapcraft.io](https://snapcraft.io/) |
| **Homebrew** | CLI & Casks | [formulae.brew.sh](https://formulae.brew.sh/) |

### 2. Δομή καταχώρισης

```json
{
  "id": "app-id",                      // Unique, lowercase, kebab-case
  "name": "App Name",                  // Official display name
  "description": "Short description",  // Max ~60 characters
  "category": "Category",              // Must match valid categories
  "icon": {                            // See Icon System section
    "type": "iconify",
    "set": "simple-icons",
    "name": "python",
    "color": "#3776AB"
  },
  "targets": {
    "ubuntu": "exact-package-name",    // apt package (official repos ONLY)
    "arch": "exact-package-name",      // pacman OR AUR package name
    "flatpak": "com.vendor.AppId",     // FULL Flatpak App ID (reverse DNS)
    "snap": "snap-name",               // Add --classic if needed
    "homebrew": "formula-name"         // Formula (CLI) or '--cask name' (GUI)
  },
  "unavailableReason": "Markdown install instructions"
}
```

### 3. Οδηγίες σχετικά με τους λόγους μη διαθεσιμότητας

Αυτό το πεδίο εμφανίζει κώδικα Markdown όταν δεν υπάρχει προορισμός. Χρησιμεύει ως οδηγία εφεδρικής λύσης για χειροκίνητη εισαγωγή.

**Απαιτήσεις:**
1.  **Πρακτική συμβουλή**: Αποφύγετε τη φράση «Δεν είναι διαθέσιμο». Αναφέρετε την εναλλακτική λύση (π.χ. «Εγκατάσταση μέσω Flatpak»).
2.  **Σύνδεσμος**: Προσθέστε έναν σύνδεσμο προς τη λύση (σελίδα Flathub, διεύθυνση URL του αρχείου .deb από τον αρχικό διανομέα ή οδηγός στο Wiki).
3.  **Μορφή**: Χρησιμοποιήστε το τυπικό Markdown για τους συνδέσμους `[text](url)` και κώδικα `` `cmd` ``.

**Παραδείγματα:**

| Στάτους | Μήνυμα | Γιατί; |
| :--- | :--- | :--- |
| ❌ **Κακό** | `'Δεν είναι διαθέσιμο.'` | Αδιέξοδο. Δεν παρέχεται λύση. |
| ❌ **Κακό** | `'Λήψη από τον ιστότοπο.'` | Αδιέξοδο. Δεν παρέχεται λύση. |
| ✅ **Καλό** | `'Δεν περιλαμβάνεται στα επίσημα αποθετήρια. Χρησιμοποιήστε την [Flatpak έκδοση](https://flathub.org/apps/com.spotify.Client) instead.'` | Ανακατευθύνει στην προτιμώμενη υποστηριζόμενη εναλλακτική λύση. |
| ✅ **Καλό** | ```'Το Arch απαιτεί [multilib](https://wiki.archlinux.org/title/Official_repositories#multilib) enabled: uncomment `[multilib]` στο `/etc/pacman.conf`, τρέξτε `sudo pacman -Syu`, μετά `sudo pacman -S steam`.'``` | Ακριβή βήματα για την ενεργοποίηση του απαιτούμενου αποθετηρίου. |

### 4. Κανόνες για συγκεκριμένες πλατφόρμες

#### Arch Linux
*   **Επίσημα πακέτα**: Χρησιμοποιήστε απευθείας το όνομα του πακέτου, εάν υπάρχει στο `core` ή `extra` (π.χ., `firefox`).
*   **Αυτόματη ανίχνευση AUR**: `src/lib/aur.ts` αναγνωρίζει αυτόματα τις καταλήξεις `-bin`, `-git`, ή `-appimage`. Χρησιμοποιήστε απευθείας το όνομα (π.χ., `brave-bin`).
*   **Χειροκίνητη ανίχνευση AUR**: Για πακέτα AUR χωρίς καταλήξεις (π.χ., `google-chrome`), **πρέπει να προσθέσετε το όνομα στο** `src/lib/aur-packages.json`.
*   Προτιμήστε `-bin` πακέτα με κατάληξη στο AUR (έτοιμα προς εγκατάσταση, ταχύτερη εγκατάσταση)

#### NixOS
Το Nixpkgs απαιτεί τη ρητή συγκατάθεση του χρήστη για το μη ελεύθερο λογισμικό.
1.  Ελέγξτε την άδεια χρήσης στο [search.nixos.org](https://search.nixos.org/packages).
2.  Εάν η άδεια χρήσης δεν είναι ελεύθερη, προσθέστε την στο αρχείο `src/lib/nix-unfree.json`, εάν δεν υπάρχει.
3.  Προσθέστε το πακέτο στο αντίστοιχο αρχείο JSON στον κατάλογο `src/lib/apps/` όπως συνήθως.

#### Ubuntu/Debian
**Αυστηρή πολιτική αποθετηρίων**: Τα σενάρια δημιουργίας **δεν** ενεργοποιούν επιπλέον αποθετήρια (όπως PPA ή το `non-free` από προεπιλογή). Τα πακέτα πρέπει να είναι διαθέσιμα στα τυπικά ενεργοποιημένα αποθετήρια.

*   **Επιτρέπεται**:
    *   **Ubuntu**: Main, Restricted
    *   **Debian**: Main
*   **Απαγορεύεται**:
    *   PPA (Personal Package Archives).
    *   Εξωτερικές διευθύνσεις URL αρχείων `.deb`.
    *   Πακέτα που απαιτούν χειροκίνητη τροποποίηση του αρχείου `sources.list` (εκτός αν αυτό διευκρινίζεται στο πεδίο `unavailableReason`).

#### Flatpak
*   **Μορφή αναγνωριστικού**: Χρησιμοποιείτε πάντα το πλήρες **αναγνωριστικό εφαρμογής** (σύμφωνα με το πρότυπο αντίστροφης DNS).
    *   ✅ Σωστό: `org.mozilla.firefox`
    *   ❌ Λάθος: `firefox`
*   **Επαλήθευση**: Βρείτε τον ακριβή κωδικό αναγνώρισης στο κάτω μέρος της εφαρμογής [Flathub page](https://flathub.org/).
*   **Σημείωση**: `verified-flatpaks.json` δημιουργείται αυτόματα· μην το επεξεργαστείτε χειροκίνητα.

#### Snap
*   **Κλασικός περιορισμός**: Εάν το snap απαιτεί κλασικό περιορισμό (πρόσβαση σε αρχεία του συστήματος του κεντρικού υπολογιστή), προσθέστε `--classic`.
    *   Παράδειγμα: `code --classic`
    *   Ελέγξτε την εντολή εγκατάστασης στο [snapcraft.io](https://snapcraft.io/) για επαλήθευση.
*   **Επαλήθευση**: Εάν ο εκδότης διαθέτει **ετικέτα "Verified"** στο [Snapcraft](https://snapcraft.io/):
    *   Προσθέστε το **όνομα του εκδότη** στο `src/lib          verified-snaps.json`.
    *   Αυτό ενεργοποιεί το σήμα "Verified" στο περιβάλλον χρήστη του UniMate.

#### Homebrew
Το Homebrew (macOS/Linux) διαθέτει δύο τύπους πακέτων. Ελέγξτε [formulae.brew.sh](https://formulae.brew.sh/) για να βρεις το σωστό.

*   **Τύπος**: Τυπικά εργαλεία και βιβλιοθήκες CLI.
    *   Χρήση: Χρησιμοποιήστε απευθείας το όνομα του πακέτου.
    *   Παράδειγμα: `'wget'`, `'node'`, `'python@3.12'`
*   **Cask**: Εφαρμογές GUI και μεγάλα εκτελέσιμα αρχεία (μόνο για macOS).
    *   Χρήση: Προσθέστε το πρόθεμα `--cask ` (προσέξτε το κενό).
    *   Παράδειγμα: `'--cask firefox'`, `'--cask visual-studio-code'`
*   **Επικύρωση**:
    *   Τρέξτε `brew search <name>` τοπικά για την επαλήθευση του τύπου.
    *   Στις εγκαταστάσεις σε Linux παραλείπουμε αυτόματα τους στόχους `--cask`.

### 5. Σύστημα εικονιδίων

EΚάθε εφαρμογή χρειάζεται ένα εικονίδιο! Η μορφή JSON που χρησιμοποιούμε καθιστά εξαιρετικά εύκολη την προσθήκη εικονιδίων χρησιμοποιώντας το [Iconify](https://iconify.design/). 

Αποθηκεύουμε τα εικονίδια ως δομημένα αντικείμενα στο JSON. Αρκεί να καθορίσετε το σύνολο, το όνομα και το χρώμα:
```json
"icon": {
  "type": "iconify",
  "set": "simple-icons",
  "name": "python",
  "color": "#3776AB"
}
```

#### Τα 3 κύρια σύνολα εικονιδίων που χρησιμοποιούμε:
1.  **Simple Icons** (`"set": "simple-icons"`)
    *   Χρησιμοποιείται για μεγάλες μάρκες και μονόχρωμα λογότυπα (όπως το Discord ή το Python).
    *   *Πρέπει να εισαγάγετε ένα hex `"color"` για αυτά.*
2.  **Logos** (`"set": "logos"`)
    *   Χρησιμοποιείται όταν μια εφαρμογή διαθέτει ένα πολύχρωμο, επίσημο λογότυπο. 
    *   *Δεν χρειάζεστε ένα `"color"` για αυτά.*
3.  **Material Design** (`"set": "mdi"`)
    *   Χρησιμοποιείται για γενικές λειτουργίες (όπως το τερματικό ή το μεγεθυντικό φακό).
    *   *Πρέπει να εισαγάγετε ένα hex `"color"` για αυτά.*

#### Δεν το βρίσκετε στο Iconify;
Αν το εικονίδιο μιας εφαρμογής δεν υπάρχει στο Iconify, μπορείς να χρησιμοποιήσεις έναν άμεσο σύνδεσμο προς μια εικόνα (κατά προτίμηση SVG ή PNG υψηλής ανάλυσης).
Απλά άλλαξε το `"type"` σε `"url"`:
```json
"icon": {
  "type": "url",
  "url": "https://raw.githubusercontent.com/..."
}
```
*   ✅ **ΝΑΙ:** Χρησιμοποιήστε έναν σταθερό σύνδεσμο (όπως την αρχική εικόνα από το επίσημο αποθετήριο GitHub της εφαρμογής ή το Wikimedia).
*   ❌ **ΟΧΙ:** Χρησιμοποιήστε υπηρεσίες φιλοξενίας εικόνων (όπως το Imgur) ή ιστότοπους με προστασία από την παράνομη χρήση εικόνων.

### 6. Έγκυρες κατηγορίες

Χρησιμοποιήστε **ακριβώς** ένα από τα παρακάτω:
*   Web Browsers • Communication • Media • Creative • Gaming • Office
*   Dev: Languages • Dev: Editors • Dev: Tools
*   Terminal • CLI Tools • VPN & Network • Security • File Sharing • System

---

## Προσθήκη διανομών

Η προσθήκη μιας νέας διανομής περιλαμβάνει τρία βασικά βήματα:

### 1. Καταχώριση διανομής
Επεξεργαστείτε [`src/lib/data.ts`](src/lib/data.ts):
1.  Προσθέστε το νέο αναγνωριστικό στον ορισμό τύπου `DistroId`.
2.  Προσθέστε ένα νέο στοιχείο στον πίνακα `distros` με:
    *   `id`: αναγνωριστικός κωδικός.
    *   `name`: Εμφανιζόμενο όνομα.
    *   `iconUrl`: Εικονίδιο για την επιλογή διανομής.
    *   `color`: Χρώμα επωνυμίας.
    *   `installPrefix`: Το προεπιλεγμένο πρόθεμα εντολών (π.χ., `sudo dnf install -y`).

### 2. Δημιουργήστε το Generator Script
Δημιουργήστε ένα νέο αρχείο `src/lib/scripts/<distroId>.ts`. Tαυτό το αρχείο πρέπει να εξάγει μια συνάρτηση (π.χ., `generateFedoraScript`) που δέχεται το `PackageInfo[]` και επιστρέφει τη συμβολοσειρά του σενάριου shell που δημιουργήθηκε.
*   Χρησιμοποιήστε βοηθητικές συναρτήσεις από το `shared.ts`, όπως τις `generateAsciiHeader` και `PackageInfo`.
*   Υλοποιήστε λογική για να ελέγχετε αν ένα πακέτο είναι ήδη εγκατεστημένο.
*   Υλοποιήστε τον βρόχο εντολών εγκατάστασης χρησιμοποιώντας το `with_retry` για μεγαλύτερη αξιοπιστία.
*   Ανατρέξτε στα αρχεία `src/lib/scripts/fedora.ts` ή `ubuntu.ts` για σαφή παραδείγματα.

### 3. Ενσωμάτωση του Generator
1.  Εξάγετε τη νέα σας συνάρτηση στο [`src/lib/scripts/index.ts`](src/lib/scripts/index.ts).
2.  Εισαγάγετέ την στο [`src/lib/generateInstallScript.ts`](src/lib/generateInstallScript.ts).
3.  Προσθέστε μια περίπτωση για το `distroId` σας στη δήλωση `switch` μέσα στο `generateInstallScript`.
4.  Προσθέστε επίσης την απλή λογική εντολής μιας γραμμής στο `generateSimpleCommand` μέσα στο ίδιο αρχείο.
