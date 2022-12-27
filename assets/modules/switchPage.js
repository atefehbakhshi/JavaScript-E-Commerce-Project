const $ = document;
const body = $.body;
export const switchPage = (pageNumber) => {
  body.addEventListener("click", () => {
    window.location.href = `onboardingPage${pageNumber}.html`;
  });
};
