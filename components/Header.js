import { useEffect, useRef } from 'react'
import Link from 'next/link'
import BLOG from '@/blog.config'
import { useLocale } from '@/lib/locale'

const NavBar = () => {
  const locale = useLocale()
  const links = [
    { id: 0, name: locale.NAV.INDEX, to: BLOG.path || '/', show: true },
    { id: 1, name: locale.NAV.ABOUT, to: '/about', show: BLOG.showAbout },
    { id: 2, name: locale.NAV.RSS, to: '/feed', show: true },
    { id: 3, name: locale.NAV.SEARCH, to: '/search', show: true }
  ]
  return (
    <div className="flex-shrink-0">
      <ul className="flex flex-row">
        {links.map(
          link =>
            link.show && (
              <li
                key={link.id}
                className="block ml-4 text-black dark:text-gray-50 nav"
              >
                <Link href={link.to}>
                  <a>{link.name}</a>
                </Link>
              </li>
            )
        )}
      </ul>
    </div>
  )
}

const Header = ({ navBarTitle, fullWidth }) => {
  const useSticky = !BLOG.autoCollapsedNavBar
  const navRef = useRef(null)
  const sentinalRef = useRef([])
  const handler = ([entry]) => {
    if (navRef && navRef.current && useSticky) {
      if (!entry.isIntersecting && entry !== undefined) {
        navRef.current?.classList.add('sticky-nav-full')
      } else {
        navRef.current?.classList.remove('sticky-nav-full')
      }
    } else {
      navRef.current?.classList.add('remove-sticky')
    }
  }
  useEffect(() => {
    const obvserver = new window.IntersectionObserver(handler)
    obvserver.observe(sentinalRef.current)
    // Don't touch this, I have no idea how it works XD
    // return () => {
    //   if (sentinalRef.current) obvserver.unobserve(sentinalRef.current)
    // }
    /* eslint-disable-line */
  }, [sentinalRef])
  return (
    <>
      <div className="observer-element h-4 md:h-12" ref={sentinalRef}></div>
      <div
        className={`sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60 ${
          !fullWidth ? 'max-w-3xl px-4' : 'px-4 md:px-24'
        }`}
        id="sticky-nav"
        ref={navRef}
      >
        <div className="flex items-center">
          <Link href="/">
            <a aria-label={BLOG.title}>
              <div className="h-6">
                {/* <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="24"
                    height="24"
                    className="fill-current text-black dark:text-white"
                  />
                  <rect width="24" height="24" fill="url(#paint0_radial)" />
                  <defs>
                    <radialGradient
                      id="paint0_radial"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="rotate(45) scale(39.598)"
                    >
                      <stop stopColor="#CFCFCF" stopOpacity="0.6" />
                      <stop offset="1" stopColor="#334553" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg> */}

                <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <path d="M16389 189L16405 189L16405 205L16389 205L16389 189Z" id="path_1" />
                    <clipPath id="mask_1">
                      <use xlink:href="#path_1" />
                    </clipPath>
                  </defs>
                  <path d="M0 12C0 5.37259 5.37305 0 12 0C18.627 0 24 5.37259 24 12C24 18.6274 18.627 24 12 24C5.37305 24 0 18.6274 0 12Z" id="Ellipse" fill="#D3D3D3" fill-rule="evenodd" stroke="none" />
                  <g id="Settings-icon" transform="translate(4 4)">
                    <path d="M16389 189L16405 189L16405 205L16389 205L16389 189Z" id="Background" fill="none" fill-rule="evenodd" stroke="none" />
                    <g clip-path="url(#mask_1)">
                      <path d="M16402.2 198.067C16402.2 197.833 16402.3 197.6 16402.3 197.333C16402.3 197.067 16402.2 196.833 16402.2 196.6L16403.7 195.533C16403.8 195.433 16403.9 195.233 16403.8 195.067L16402.3 192.6C16402.2 192.433 16402.1 192.367 16401.9 192.467L16400.2 193.233C16399.8 192.933 16399.4 192.7 16399 192.5L16398.8 190.667C16398.8 190.5 16398.6 190.367 16398.5 190.367L16395.6 190.367C16395.4 190.367 16395.3 190.5 16395.3 190.667L16395.1 192.5C16394.6 192.7 16394.2 192.933 16393.8 193.233L16392.2 192.467C16392 192.4 16391.8 192.467 16391.7 192.6L16390.3 195.067C16390.2 195.233 16390.3 195.433 16390.4 195.533L16391.9 196.6C16391.9 196.833 16391.8 197.067 16391.8 197.333C16391.8 197.6 16391.9 197.833 16391.9 198.067L16390.3 199.133C16390.2 199.233 16390.1 199.433 16390.2 199.6L16391.7 202.067C16391.8 202.233 16391.9 202.3 16392.1 202.2L16393.8 201.433C16394.2 201.733 16394.6 201.967 16395 202.167L16395.2 204C16395.2 204.167 16395.4 204.3 16395.5 204.3L16398.4 204.3C16398.6 204.3 16398.7 204.167 16398.7 204L16398.9 202.167C16399.4 201.967 16399.8 201.733 16400.2 201.433L16401.8 202.2C16402 202.267 16402.2 202.2 16402.3 202.067L16403.7 199.6C16403.8 199.433 16403.7 199.233 16403.6 199.133L16402.2 198.067L16402.2 198.067ZM16397 200.667C16395.2 200.667 16393.7 199.167 16393.7 197.333C16393.7 195.5 16395.2 194 16397 194C16398.8 194 16400.3 195.5 16400.3 197.333C16400.3 199.167 16398.8 200.667 16397 200.667L16397 200.667Z" id="Shape" fill="#607D8B" fill-rule="evenodd" stroke="none" />
                      <path d="M16397 193.333C16394.8 193.333 16393 195.133 16393 197.333C16393 199.533 16394.8 201.333 16397 201.333C16399.2 201.333 16401 199.533 16401 197.333C16401 195.133 16399.2 193.333 16397 193.333L16397 193.333ZM16397 199C16396.1 199 16395.3 198.267 16395.3 197.333C16395.3 196.4 16396.1 195.667 16397 195.667C16397.9 195.667 16398.7 196.4 16398.7 197.333C16398.7 198.267 16397.9 199 16397 199L16397 199Z" id="Shape" fill="#455A64" fill-rule="evenodd" stroke="none" />
                    </g>
                  </g>
                </svg>

              </div>
            </a>
          </Link>
          {navBarTitle
            ? (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {navBarTitle}
            </p>
              )
            : (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {BLOG.title},{' '}
              <span className="font-normal">{BLOG.description}</span>
            </p>
              )}
        </div>
        <NavBar />
      </div>
    </>
  )
}

export default Header
