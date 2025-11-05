export default function DashboardLoader({text, disableText}) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-14 h-14 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
       {
        disableText ? null :  <p className="text-sm text-muted-foreground">{text || 'Loading...'}</p>
       }
      </div>
    </div>
  )
} 