import React from "react";
import { ModelDesc, SyncState } from "../../shared/types";

export function useModels() {
  const [modelInfos, setModelInfos] = React.useState<(ModelDesc & SyncState)[]>(
    []
  );
  const [spaceConsumed, setSpaceConsumed] = React.useState(0);
  const [spaceAvailable, setSpaceAvailable] = React.useState(0);
  return React.useMemo(
    () => ({ modelInfos, spaceConsumed, spaceAvailable }),
    [modelInfos]
  );
}
