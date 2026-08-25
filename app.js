document.addEventListener('DOMContentLoaded', () => {
    const DATA_URL = 'characters.json';
    let charactersData = [];

    const matcherForm = document.getElementById('matcherForm');
    const raceSelect = document.getElementById('raceSelect');
    const realmSelect = document.getElementById('realmSelect');
    const genderSelect = document.getElementById('genderSelect');
    const submitBtn = document.getElementById('submitBtn');
    const resetBtn = document.getElementById('resetBtn');
    const tryAgainBtn = document.getElementById('tryAgainBtn');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const btnText = document.querySelector('.btn-text');

    const errorAlert = document.getElementById('errorAlert');
    const errorMessage = document.getElementById('errorMessage');
    const errorHeading = document.getElementById('errorHeading');

    const resultCard = document.getElementById('resultCard');
    const charNameEl = document.getElementById('charName');
    const charRaceEl = document.getElementById('charRace');
    const charRealmEl = document.getElementById('charRealm');
    const charGenderEl = document.getElementById('charGender');
    const referenceLink = document.getElementById('referenceLink');

    async function loadCharacters() {
        try {
            const response = await fetch(DATA_URL);
            if (!response.ok) {
                throw new Error(`Failed to load lore database (${response.status})`);
            }
            charactersData = await response.json();
        } catch (err) {
            console.error('Error loading character dataset:', err);
            showError('Unable to open the lore archives. Please ensure characters.json is available.', 'Archive Error');
        }
    }

    loadCharacters();

    matcherForm.addEventListener('submit', (e) => {
        e.preventDefault();

        hideError();
        hideResult();

        if (!charactersData || charactersData.length === 0) {
            showError('The lore archives are still loading or unavailable. Please try again in a moment.');
            return;
        }

        setLoadingState(true);

        const selectedRace = raceSelect.value.trim().toLowerCase();
        const selectedRealm = realmSelect.value.trim().toLowerCase();
        const selectedGender = genderSelect.value.trim().toLowerCase();

        const matches = charactersData.filter((char) => {
            const matchRace = !selectedRace || (char.race && char.race.toLowerCase() === selectedRace);
            const matchRealm = !selectedRealm || (char.realm && char.realm.toLowerCase().includes(selectedRealm));
            const matchGender = !selectedGender || (char.gender && char.gender.toLowerCase() === selectedGender);
            return matchRace && matchRealm && matchGender;
        });

        setTimeout(() => {
            setLoadingState(false);

            if (matches.length === 0) {
                showError('No characters in the archives matched your exact combination. Try broadening your lineage, realm, or form!', 'No Match Found');
                return;
            }

            const randomIndex = Math.floor(Math.random() * matches.length);
            const matchedChar = matches[randomIndex];

            displayResult(matchedChar);
        }, 250);
    });

    function resetMatcher() {
        matcherForm.reset();
        hideError();
        hideResult();
        submitBtn.disabled = false;
        raceSelect.focus();
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', resetMatcher);
    }

    if (tryAgainBtn) {
        tryAgainBtn.addEventListener('click', () => {
            hideResult();
            hideError();
            matcherForm.dispatchEvent(new Event('submit'));
        });
    }

    function setLoadingState(isLoading) {
        if (isLoading) {
            loadingSpinner.classList.remove('d-none');
            btnText.textContent = 'Consulting the lore...';
            submitBtn.disabled = true;
        } else {
            loadingSpinner.classList.add('d-none');
            btnText.textContent = 'Reveal My Match';
            submitBtn.disabled = false;
        }
    }

    function showError(msg, heading = 'A Shadow Falls!') {
        if (errorHeading) errorHeading.textContent = heading;
        errorMessage.textContent = msg;
        errorAlert.classList.remove('d-none');
    }

    function hideError() {
        errorAlert.classList.add('d-none');
    }

    function hideResult() {
        resultCard.classList.remove('show');
        resultCard.classList.add('d-none');
    }

    function displayResult(char) {
        charNameEl.textContent = char.name || 'Unknown Wanderer';
        charRaceEl.textContent = char.race || 'Unknown';
        charRealmEl.textContent = char.realm || 'A Forgotten Realm';
        charGenderEl.textContent = char.gender || 'Unknown';

        if (char.referenceUrl) {
            referenceLink.href = char.referenceUrl;
        } else {
            const fallbackQuery = encodeURIComponent(`${char.name} Tolkien`);
            referenceLink.href = `https://tolkiengateway.net/wiki/Special:Search?search=${fallbackQuery}`;
        }

        resultCard.classList.remove('d-none');
        setTimeout(() => {
            resultCard.classList.add('show');
            resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 10);
    }
});
