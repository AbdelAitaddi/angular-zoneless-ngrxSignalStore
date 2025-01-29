import { effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { getState, patchState, signalStoreFeature, withHooks } from '@ngrx/signals';
import { STORAGE } from '../../../app.config';

export function withStorageSync(key: string, storageFactory = () => inject(STORAGE).localStore) {
  return signalStoreFeature(
    withHooks({
      onInit(store, platformId = inject(PLATFORM_ID)) {
        if (isPlatformServer(platformId)) {
          return;
        }

        const storage = storageFactory();

        const stateStr = storage.getItem(key);
        if (stateStr) {
          patchState(store, JSON.parse(stateStr));
        }

        effect(() => {
          const state = getState(store);
          storage.setItem(key, JSON.stringify(state));
        });
      },
    }),
  );
}
