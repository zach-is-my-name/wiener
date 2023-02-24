import { useHasInternet, useHasLatestInArchive } from './index.js';
import { useEffect } from 'react';
export function useInitLoad(ctrDispatch, loadState) {
  var hasInternet = useHasInternet();
  var _useHasLatestInArchiv = useHasLatestInArchive(hasInternet, loadState),
    hasLatestInArchive = _useHasLatestInArchiv.hasLatestInArchive,
    dateLatestPub = _useHasLatestInArchiv.dateLatestPub;
  useEffect(function () {
    if (hasInternet === true) {
      if (hasLatestInArchive === true) {
        ctrDispatch({
          type: "getArchiveMostRecent"
        });
      } else if (hasLatestInArchive === false) {
        ctrDispatch({
          type: "fetchLatest"
        });
      } else if (hasLatestInArchive === "loading") {
        ctrDispatch({
          type: "loading"
        });
      }
    } else if (hasInternet === false) {
      //no internet
      ctrDispatch({
        type: "getArchiveMostRecent"
      });
    } else if (hasInternet === "loading") {
      ctrDispatch({
        type: "loading"
      });
    }
  }, [hasInternet, hasLatestInArchive]);
  return [dateLatestPub, hasInternet, hasLatestInArchive];
}
//# sourceMappingURL=useInitLoad.js.map