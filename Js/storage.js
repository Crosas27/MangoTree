const APP_STATE_KEY = 'uiforge-app-state';
const DB_NAME = 'ui-element-forge';
const DB_VERSION = 1;
const PRESET_STORE = 'presets';
const RECENT_STORE = 'recentBuilds';

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(PRESET_STORE)) {
        const presetStore = db.createObjectStore(PRESET_STORE, { keyPath: 'id' });
        presetStore.createIndex('updatedAt', 'updatedAt');
      }
      if (!db.objectStoreNames.contains(RECENT_STORE)) {
        const recentStore = db.createObjectStore(RECENT_STORE, { keyPath: 'id' });
        recentStore.createIndex('updatedAt', 'updatedAt');
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function put(storeName, value) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    tx.objectStore(storeName).put(value);
    tx.oncomplete = () => resolve(value);
    tx.onerror = () => reject(tx.error);
  });
}

async function getAll(storeName) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const request = tx.objectStore(storeName).getAll();
    request.onsuccess = () => {
      const rows = request.result || [];
      rows.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
      resolve(rows);
    };
    request.onerror = () => reject(request.error);
  });
}

async function remove(storeName, id) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    tx.objectStore(storeName).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export function loadAppState() {
  try {
    return JSON.parse(localStorage.getItem(APP_STATE_KEY) || 'null');
  } catch {
    return null;
  }
}

export function saveAppState(state) {
  localStorage.setItem(APP_STATE_KEY, JSON.stringify(state));
}

export async function savePreset(preset) {
  return put(PRESET_STORE, {
    ...preset,
    updatedAt: Date.now()
  });
}

export async function listPresets() {
  return getAll(PRESET_STORE);
}

export async function deletePreset(id) {
  return remove(PRESET_STORE, id);
}

export async function saveRecentBuild(build) {
  return put(RECENT_STORE, {
    ...build,
    updatedAt: Date.now()
  });
}

export async function listRecentBuilds(limit = 8) {
  const rows = await getAll(RECENT_STORE);
  return rows.slice(0, limit);
}
