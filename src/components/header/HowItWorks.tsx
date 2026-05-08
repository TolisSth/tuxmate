'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { HelpCircle, X } from 'lucide-react';
import { analytics } from '@/lib/analytics';

// Help modal.
export function HowItWorks() {
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [mounted, setMounted] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);

    const handleOpen = () => {
        setIsClosing(false);
        setIsOpen(true);
        analytics.helpOpened();
    };

    const handleClose = () => {
        setIsClosing(true);
        analytics.helpClosed();
        setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
        }, 200);
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

            if (e.ctrlKey || e.altKey || e.metaKey) return;

            if (e.key === '?' || (e.shiftKey && e.key === '/')) {
                e.preventDefault();
                if (isOpen) {
                    handleClose();
                } else {
                    handleOpen();
                }
            }

            if (e.key === 'Escape' && isOpen) {
                handleClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    const modal = (
        <>
            <div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[99998]"
                onClick={handleClose}
                style={{
                    animation: isClosing
                        ? 'fadeOut 0.2s ease-out forwards'
                        : 'fadeIn 0.25s ease-out'
                }}
            />

            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="how-it-works-title"
                className="fixed bg-[var(--bg-primary)] border border-[var(--border-primary)]/30 rounded-xl z-[99999]"
                style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '620px',
                    maxWidth: 'calc(100vw - 32px)',
                    maxHeight: 'min(85vh, 720px)',
                    display: 'flex',
                    flexDirection: 'column',
                    animation: isClosing
                        ? 'modalSlideOut 0.2s ease-out forwards'
                        : 'modalSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    overflow: 'hidden',
                    boxShadow: '0 16px 48px -8px rgba(0, 0, 0, 0.3)',
                }}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-primary)]/15">
                    <h3 id="how-it-works-title" className="text-base font-semibold text-[var(--text-primary)]">
                        Βοήθεια
                    </h3>
                    <button
                        onClick={handleClose}
                        className="p-1.5 -mr-1 hover:bg-[var(--bg-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6" style={{ scrollbarGutter: 'stable' }}>

                    <section>
                        <h4 className="text-sm font-medium text-[var(--text-primary)] mb-4 pl-3 border-l-2 border-[var(--text-muted)]/30">Συντομεύσεις πληκτρολογίου</h4>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                            {[
                                ['↑↓←→', 'Πλοήγηση στις εφαρμογές'],
                                ['hjkl', 'Πλοήγηση τύπου Vim'],
                                ['Κενό', 'Επιλογή ή κατάργηση επιλογής εφαρμογής'],
                                ['/', 'Πεδίο αναζήτησης'],
                                ['y', 'Αντιγραφή εντολής εγκατάστασης'],
                                ['d', 'Λήψη του σεναρίου εγκατάστασης'],
                                ['c', 'Εκκαθάριση όλων των επιλογών'],
                                ['t', 'Εναλλαγή φωτεινού/σκοτεινού θέματος'],
                                ['Tab', 'Προεπισκόπηση των τρέχων επιλογών'],
                                ['Esc', 'Κλείσε αυτό το αναδυόμενο παράθυρο'],
                                ['?', 'Προβολή αυτής της βοήθειας'],
                                ['1 / 2', 'Εναλλαγή βοηθητικού προγράμματος AUR (yay/paru)'],
                            ].map(([key, desc]) => (
                                <div key={key} className="flex items-center gap-3 text-sm">
                                    <kbd className="inline-flex items-center justify-center min-w-[52px] px-2 py-1 bg-[var(--bg-secondary)] border border-[var(--border-primary)]/20 rounded text-xs font-mono text-[var(--text-secondary)]">
                                        {key}
                                    </kbd>
                                    <span className="text-[var(--text-muted)]">{desc}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h4 className="text-sm font-medium text-[var(--text-primary)] mb-3 pl-3 border-l-2 border-[var(--text-muted)]/30">Πρώτα βήματα</h4>
                        <ol className="space-y-2 text-sm text-[var(--text-muted)] leading-relaxed">
                            <li>
                                <strong className="text-[var(--text-secondary)]">1. Επιλέξτε τη διανομή σας</strong> — Επιλέξτε τη διανομή Linux σας από το αναπτυσσόμενο μενού στην κορυφή. Αυτό καθορίζει ποιες εντολές διαχειριστή πακέτων θα δημιουργήσει το TuxMate για εσάς.
                            </li>
                            <li>
                                <strong className="text-[var(--text-secondary)]">2. Επιλέξτε εφαρμογιές</strong> — Περιηγηθείτε στις κατηγορίες και κάντε κλικ στις εφαρμογές για να τις προσθέσετε στην επιλογή σας. Οι επιλεγμένες εφαρμογές εμφανίζονται με έντονη γραφή. Χρησιμοποιήστε τις συντομεύσεις πληκτρολογίου για ταχύτερη πλοήγηση.
                            </li>
                            <li>
                                <strong className="text-[var(--text-secondary)]">3. Αντιγραφή ή λήψη</strong> — Αντιγράψτε την εντολή εγκατάστασης που δημιουργήθηκε στο πρόχειρο ή κατεβάστε ένα πλήρες σενάριο shell. Τα σενάρια που κατεβάζετε περιλαμβάνουν διαχείριση σφαλμάτων και μπορούν να εγκαταστήσουν πολλές εφαρμογές ταυτόχρονα.
                            </li>
                            <li>
                                <strong className="text-[var(--text-secondary)]">4. Εκτέλεση στο τερματικό</strong> — Ανοίξτε το τερματικό σας, επικολλήστε την εντολή (Ctrl+Shift+V) και πατήστε Enter. Το σενάριο θα αναλάβει τα υπόλοιπα.
                            </li>
                        </ol>
                    </section>

                    <section>
                        <h4 className="text-sm font-medium text-[var(--text-primary)] mb-3 pl-3 border-l-2 border-[var(--text-muted)]/30">Χρήσιμες πληροφορίες</h4>
                        <ul className="space-y-2 text-sm text-[var(--text-muted)] leading-relaxed">
                            <li>
                                <strong className="text-[var(--text-secondary)]">Εφαρμογές με γκρι χρώμα</strong> δεν είναι διαθέσιμα στα επίσημα αποθετήρια της διανομής σας. Δοκιμάστε να επιλέξετε το Flatpak ή το Snap από το αναπτυσσόμενο μενού ή τοποθετήστε τον κέρσορα πάνω στο εικονίδιο πληροφοριών δίπλα στην εφαρμογή για εναλλακτικούς τρόπους εγκατάστασης.
                            </li>
                            <li>
                                <strong className="text-[var(--text-secondary)]">Χρήστες Arch Linux</strong> — Ορισμένα πακέτα προέρχονται από το AUR. Το UniMate χρησιμοποιεί το yay ή το paru ως βοηθητικό πρόγραμμα για το AUR. Πατήστε το 1 ή το 2 οποιαδήποτε στιγμή για να εναλλάσσεστε μεταξύ τους.
                            </li>
                            <li>
                                <strong className="text-[var(--text-secondary)]">Χρήστες Homebrew</strong> — Λειτουργεί τόσο σε macOS όσο και σε Linux. Οι εφαρμογές με γραφικό περιβάλλον χρήστη (Casks) είναι διαθέσιμες μόνο για macOS και θα παραλείπονται αυτόματα στο Linux. Το σενάριο αναλαμβάνει αυτόν τον έλεγχο για εσάς.
                            </li>
                            <li>
                                <strong className="text-[var(--text-secondary)]">Αυτόματη αποθήκευση</strong> — Οι επιλογές σας για τις εφαρμογές αποθηκεύονται αυτόματα στον περιηγητή σας. Επισκεφθείτε ξανά τη σελίδα όποτε θέλετε και οι επιλογές σας θα παραμένουν εκεί.
                            </li>
                            <li>
                                <strong className="text-[var(--text-secondary)]">NixOS</strong> — Δημιουργεί το αρχείο `environment.systemPackages`. Αν επιλέξετε εφαρμογές που δεν είναι ελεύθερες, η λήψη περιλαμβάνει σχόλια που αναφέρουν ακριβώς τι πρέπει να προσθέσετε στη λίστα εξαιρέσεων με το `allowUnfree`.
                            </li>
                            <li>
                                <strong className="text-[var(--text-secondary)]">Ασφάλεια σεναρίων</strong> — Τα σενάρια που κατεβάζετε είναι αξιόπιστα και ισχυρά. Περιλαμβάνουν διαχείριση σφαλμάτων, επαναλήψεις δικτυακών συνδέσεων και ελέγχους συστήματος. Εκτελέστε τα με <code className="px-1 py-0.5 bg-[var(--bg-secondary)] border border-[var(--border-primary)]/20 rounded text-xs font-mono">bash tuxmate-*.sh</code> για να εγκαταστήσετε με ασφάλεια την επιλογή σας.
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </>
    );

    return (
        <>
            <button
                ref={triggerRef}
                onClick={handleOpen}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs sm:text-sm transition-all duration-200 hover:scale-105 ${isOpen
                    ? 'bg-[var(--accent)]/20 text-[var(--text-primary)]'
                    : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'}`}
            >
                <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="whitespace-nowrap">Βοήθεια</span>
            </button>
            {isOpen && mounted && typeof document !== 'undefined' && createPortal(modal, document.body)}
        </>
    );
}
