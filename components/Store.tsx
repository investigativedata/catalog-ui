"use client";

import { StoreProvider, createStore } from "easy-peasy";
import Store, { IInitialState } from "~/util/store";

export default function StoreContext({
  datasets,
  filterValueCounts,
  children,
}: React.PropsWithChildren<IInitialState>) {
  const store = createStore(Store, {
    initialState: { datasets, filteredDatasets: datasets, filterValueCounts },
  });
  return <StoreProvider store={store}>{children}</StoreProvider>;
}
