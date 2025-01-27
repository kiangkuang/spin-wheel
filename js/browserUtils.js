export function requestFullscreen(element) {
  const requestMethod =
    element.requestFullScreen ||
    element.webkitRequestFullscreen ||
    element.webkitRequestFullScreen ||
    element.mozRequestFullScreen ||
    element.msRequestFullscreen;

  requestMethod?.apply(element);
}

export function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}

export function updateUrlParams(params) {
  history.replaceState(
    null,
    "",
    params
      ? `${window.location.pathname}?${params}`
      : window.location.pathname,
  );
}
