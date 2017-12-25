import { getStampAndKindFromKey } from 'keysavcore/key-store';
import SaveKey from 'keysavcore/save-key';
import BattleVideoKey from 'keysavcore/battle-video-key';
import * as localForage from 'localforage';

function createNoKeyError(stamp, isSav) {
  var e = new Error(`No key for ${isSav ? 'save' : 'battle video'} with stamp ${stamp} available.`);
  e.name = 'NoKeyAvailableError';
  e.stamp = stamp;
  e.keyType = isSav ? 'SAV' : 'BV';
  return e;
}

export default class KeyStoreBrowser {
  constructor() {
    this.loading = true;
    this.promise = localForage.getItem('keysave-keys').then(k => {
      k = Array.isArray(k) ? k : [];
      this.keys = {};
      for (const key of k) {
        const { stamp, kind } = getStampAndKindFromKey(key, key.length);
        this.keys[stamp] = { stamp, kind, key: kind === 0 ? new SaveKey(key) : new BattleVideoKey(key) };
      }
      this.loading = false;
    }, () => {
      this.loading = false;
    });
    window.addEventListener('beforeunload', () => {
      this.writeKeys();
    });
  }

  async getKey(stamp, kind) {
    if (this.loading) await this.promise;
    if (this.keys[stamp] && this.keys[stamp].kind === kind) {
      return this.keys[stamp].key;
    } else {
      throw createNoKeyError(stamp, kind === 0);
    }
  }

  async getSaveKey(stamp) {
    return await this.getKey(stamp, 0);
  }

  async getBvKey(stamp) {
    return await this.getKey(stamp, 1);
  }

  async writeKeys() {
    if (this.loading) await this.promise;
    await localForage.setItem('keysave-keys', Object.keys(this.keys).map(stamp => this.keys[stamp].key.keyData));
  }

  async setKey(name, key, kind) {
    if (this.loading) await this.promise;
    this.keys[key.stamp] = { stamp: key.stamp, key, kind };
    await this.writeKeys();
  }

  async setBvKey(key) {
      await this.setKey(`BV Key - ${key.stamp.replace(/\//g, '-')}.bin`, key, 1);
  }

  async setSaveKey(key) {
    await this.setKey(`SAV Key - ${key.stamp.replace(/\//g, '-')}.bin`, key, 0);
  }

  async setOrMergeBvKey(key) {
    try {
      const oldKey = await this.getBvKey(key.stamp);
      oldKey.mergeKey(key);
    } catch (e) {
      await this.setBvKey(key);
    }
  }

  async setOrMergeSaveKey(key) {
    try {
      const oldKey = await this.getSaveKey(key.stamp);
      oldKey.mergeKey(key);
    } catch (e) {
      await this.setSaveKey(key);
    }
  }
}