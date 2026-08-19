export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  SERVICES: "/services",
  SERVICE_DETAILS: (id: string) => `/services/${id}`,
  PRODUCTS: "/products",
  PRODUCT_DETAILS: (id: string) => `/products/${id}`,
  PROJECTS: "/projects",
  PROJECT_DETAILS: (id: string) => `/projects/${id}`,
  CONTACT: "/contact",
  RFQ: "/rfq",
  CLIENTS: "/clients",
  GALLERY: "/gallery",
  CERTIFICATES: "/certificates",
  PRIVACY_POLICY: "/privacy-policy",
  TERMS: "/terms",
} as const;

export type AppRoute = keyof typeof ROUTES;
