import React from 'react'

const Footer = () => {
  return (
    <>
      <div className='bg-white bottom-0 right-0 border-t-2 border-gray-200 shadow-inner text-gray-500 transition-all duration-300 flex justify-between items-center h-fit w-full max-md:py-4 md:py-6 max-sm:text-sm ml-0 px-4 max-sm:flex-col'>
        <div className="flex text-left md:items-center">
          <span className="font-semibold">Developed & Maintained by</span>
          <span className="px-1">
            <a
              href="https://moinmn.github.io/MoinMN"
              target='_blanck'
              className='cursor-pointer font-bold text-blue-500 no-underline hover:text-blue-700'
            >
              Moin MN
            </a>
          </span>
        </div>

        <div className="flex gap-6 sm:items-center text-right mt-2 sm:mt-0">
          <div className="text-2xl md:text-3xl text-sky-300">
            <a href="mailto:moinnaik98@gmail.com">
              <i className="fa-solid fa-envelope" />
            </a>
          </div>
          <div className="text-2xl md:text-3xl text-blue-700">
            <a href="https://linkedin.com/in/moinnaik" target="_blank">
              <i className="fa-brands fa-linkedin" />
            </a>
          </div>
          <div className="text-2xl md:text-3xl text-slate-950">
            <a href="https://github.com/MoinMN" target="_blank">
              <i className="fa-brands fa-github" />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
