import appConfig from "../../../app.config";

export default function Footer() {

  return (
    <footer className="w-full flex items-center h-12 py-1 px-5 border-t border-border">
        <div className="flex justify-between w-full">
            <p className="text-xs opacity-75 font-regular">{appConfig.footer.copyright}</p>
            {/* <p className="text-sm flex items-end gap-2">
              <Link to={import.meta.env.VITE_DEVELOPER_URL} target="_blank"className="inline-flex items-center font-semibold w-auto h-[14px] relative aspect-[10.5/1.75] hover:opacity-75"><img src={resolvedTheme === 'dark' ? '/pgs-logo-dark.svg' : '/pgs-logo-light.svg'} alt="Planet Green Solutions" className='object-contain' /></Link></p> */}
        </div>
    </footer>
  )
}
