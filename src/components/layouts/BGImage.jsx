
export default function BGImage() {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none opacity-15">
        <img src={'/bg-image.png'} alt="Background Image" className="object-cover" />
    </div>
  )
}
