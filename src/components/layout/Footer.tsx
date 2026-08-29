import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-16">
      <div className="bg-primary text-background">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            <div>
              <Link to="/" className="inline-block">
                <h2 className="mb-3 text-xl font-bold lg:text-2xl">NENSHOP</h2>
              </Link>

              <address className="not-italic text-sm leading-6 text-background/70">
                <b className=" text-background">Địa chỉ: </b> Biên Giang -
                Chương Mỹ - Hà Nội
              </address>

              <p className="mt-3 max-w-xs text-sm leading-6 text-background/70">
                <b className="text-background">Điện thoại:</b> 0900.xxx.xxx
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide">
                KIẾN THỨC MẶC ĐẸP
              </h3>

              <nav className="flex flex-col gap-3 text-sm">
                <Link
                  to="#"
                  className="text-background/70 transition-opacity hover:text-background"
                >
                  Blog
                </Link>

                <Link
                  to="#"
                  className="text-background/70 transition-opacity hover:text-background"
                >
                  NenShop có gì mới?
                </Link>
              </nav>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide">
                CHÍNH SÁCH
              </h3>

              <nav className="flex flex-col gap-3 text-sm">
                <Link
                  to="#"
                  className="text-background/70 transition-opacity hover:text-background"
                >
                  Chính sách thành viên
                </Link>

                <Link
                  to="#"
                  className="text-background/70 transition-opacity hover:text-background"
                >
                  Chính sách giao hàng
                </Link>

                <Link
                  to="#"
                  className="text-background/70 transition-opacity hover:text-background"
                >
                  Quy định đổi trả
                </Link>

                <Link
                  to="#"
                  className="text-background/70 transition-opacity hover:text-background"
                >
                  Chính sách xử lý khiếu nại
                </Link>
              </nav>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide">
                FOLLOW ME
              </h3>

              <div className="flex items-center gap-2">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700 md:w-auto md:px-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    className="h-4 w-4"
                    fill="currentColor"
                  >
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58-.001-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>

                  <span className="hidden md:ml-2 md:block">Facebook</span>
                </a>

                <a
                  href="mailto:contact@nenshop.com"
                  aria-label="Email"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-white transition-colors hover:bg-blue-600 md:w-auto md:px-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="h-4 w-4"
                    fill="currentColor"
                  >
                    <path d="M48 64c-26.5 0-48 21.5-48 48 0 15.1 7.1 29.3 19.2 38.4l208 156c17.1 12.8 40.5 12.8 57.6 0l208-156c12.1-9.1 19.2-23.3 19.2-38.4 0-26.5-21.5-48-48-48L48 64zM0 196L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-188-198.4 148.8c-34.1 25.6-81.1 25.6-115.2 0L0 196z" />
                  </svg>

                  <span className="hidden md:ml-2 md:block">Email</span>
                </a>

                <a
                  href="#"
                  aria-label="Youtube"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white transition-colors hover:bg-red-700 md:w-auto md:px-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    className="h-4 w-4"
                    fill="currentColor"
                  >
                    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
                  </svg>

                  <span className="hidden md:ml-2 md:block">Youtube</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary border-t border-background/10 py-4 text-center">
        <span className="text-xs text-background/60 sm:text-sm">
          Copyright © 2026. Chu Ly Thanh
        </span>
      </div>
    </footer>
  );
}
