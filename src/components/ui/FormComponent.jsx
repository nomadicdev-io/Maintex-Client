import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCallback, useEffect, useId, useRef, useState } from "react"
import Dropzone from 'react-dropzone'
import { FileIcon, FileTextIcon, HardDriveUpload, ImagePlus, ImageUp, XIcon } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import countries from '@/store/country.json'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import orbit from "../../api"
import { Spinner } from "@/components/ui/spinner"
import ImageComponent from "./ImageComponent"
import { AnimatePresence } from "motion/react"
import FormLoader from "../loaders/FormLoader"

export const InputField = ({label, name, type, placeholder, value, onChange, error, isError, isLoading, isSuccess, readOnly = false, onBlur, disabled = false, autoFocus = false, autoComplete = 'off', className, classNames, startContent, endContent, ...props}) => {
    
    const id = useId()
    
    return (
        <div className={cn("grid w-full items-center relative", classNames?.wrapper, className)}>
            <Label htmlFor={id} className={cn("mb-2", classNames?.label)}>{label}</Label>
            <div className={cn("relative w-full flex ", classNames?.wrapper)}>
                <Input 
                    {...props}
                    type={type} 
                    name={name}
                    id={id} 
                    placeholder={placeholder} 
                    onChange={onChange} 
                    value={value} 
                    error={error} 
                    isError={isError}
                    readOnly={readOnly}
                    onBlur={onBlur}
                    isLoading={isLoading}
                    isSuccess={isSuccess}
                    disabled={disabled}
                    autoFocus={autoFocus}
                    autoComplete={autoComplete}
                    className={cn("w-full", classNames?.input)}
                />
                {startContent ?
                    <div className={cn("absolute left-0 top-0 bottom-0 flex items-center justify-center h-full w-auto aspect-square", classNames?.startContent)}>{startContent}</div>
                : null}
                {endContent ? 
                    <div className={cn("absolute right-0 top-0 bottom-0 flex items-center justify-center h-full w-auto aspect-square", classNames?.endContent)}>{endContent}</div>
                : null}
            </div>
            {isError ? <p className={cn("text-[0.65rem] text-red-500 px-2 mt-1 absolute bottom-0 left-0 translate-y-full", classNames?.error)}>{error}</p> : null}
        </div>
    )
}

export const DropUploader = () => {

    const dropzoneRef = useRef()

    return (
        <div className={'relative w-full min-h-[6rem] rounded-lg border border-dashed border-border bg-slate-50 p-5 flex items-center justify-center text-center group cursor-pointer transition-all duration-300 hover:border-primary/50 hover:bg-primary/2'}>
            <Dropzone ref={dropzoneRef}>
                {({getRootProps, getInputProps}) => (
                    <div {...getRootProps()} className="flex flex-col items-center justify-center gap-4">
                    <input {...getInputProps()} />
                    <ImageUp strokeWidth={1.5} className="w-12 h-12 opacity-20 group-hover:opacity-100 group-hover:text-primary transition-all duration-300" />
                    <p className="text-xs opacity-50 max-w-[80%]">Drag 'n' drop image here, or click to select files</p>
                    </div>
                )}
            </Dropzone>
        </div>
    )
}

export const InputSelect = ({label, placeholder, value, onChange, error, isError, disabled = false, options, className, classNames, startContent, endContent, ...props}) => {
    
    const id = useId()
    
    return (
        <div className={cn("grid w-full items-center relative", classNames?.wrapper, className)}>
            <Label htmlFor={id} className={cn("mb-2", classNames?.label)}>{label}</Label>
            <div className={cn("relative w-full flex flex-col", classNames?.wrapper)}>
                <Select value={value} onValueChange={onChange} disabled={disabled} {...props}>
                    <SelectTrigger className={cn("w-full", classNames?.input)} error={error}>
                        <SelectValue value={value} placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {startContent ?
                    <div className={cn("absolute left-0 top-0 bottom-0 flex items-center justify-center h-full w-auto aspect-square", classNames?.startContent)}>{startContent}</div>
                : null}
                {endContent ? 
                    <div className={cn("absolute right-0 top-0 bottom-0 flex items-center justify-center h-full w-auto aspect-square", classNames?.endContent)}>{endContent}</div>
                : null}
            </div>

            {isError ? <p className={cn("text-[0.65rem] text-red-500 px-2 mt-1 absolute bottom-0 left-0 translate-y-full", classNames?.error)}>{error}</p> : null}
     </div>
    )
}

export const InputCountry = ({label, placeholder, value, onChange, error, isError, disabled = false, options = [], className, classNames, startContent, endContent, ...props}) => {
    
    const id = useId()
    
    return (
        <div className={cn("grid w-full items-center relative", classNames?.wrapper, className)}>
            <Label htmlFor={id} className={cn("mb-2", classNames?.label)}>{label}</Label>
            <div className={cn("relative w-full flex flex-col", classNames?.wrapper)}>
            <Select value={value} onValueChange={onChange} disabled={disabled} {...props}>
                <SelectTrigger className={cn("w-full", classNames?.input)}>
                    <SelectValue placeholder={!value ? placeholder : null} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.iso} value={option.iso}>{option.flag} &nbsp; {option.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {startContent ?
                <div className={cn("absolute left-0 top-0 bottom-0 flex items-center justify-center h-full w-auto aspect-square", classNames?.startContent)}>{startContent}</div>
            : null}
            {endContent ? 
                <div className={cn("absolute right-0 top-0 bottom-0 flex items-center justify-center h-full w-auto aspect-square", classNames?.endContent)}>{endContent}</div>
            : null}
            </div>
            {isError ? <p className={cn("text-[0.65rem] text-red-500 px-2 mt-1 absolute bottom-0 left-0 translate-y-full", classNames?.error)}>{error}</p> : null}
     </div>
    )
}

export const InputPhone = ({label, value, onChange, error, isError, disabled = false, ...props}) => {
    
    const id = useId()
   
    const onCodeChange = (e) => {
        onChange({
            ...value,
            phoneCode: e,
        })
    }

    const onPhoneChange = (e) => {
        onChange({
            ...value,
            phone: e.target.value,
        })
    }
    
    return (
        <div className="grid w-full items-center relative">
            <Label htmlFor={id} className="mb-2">{label}</Label>
            <div className="flex flex-wrap items-center gap-2">
                <Select value={value.phoneCode} onValueChange={onCodeChange} disabled={disabled} {...props}>
                    <SelectTrigger className="min-w-[5rem] max-w-[5rem] px-2 gap-0" hideDropdownIcon={true}>
                        <SelectValue placeholder={'+000'} />
                    </SelectTrigger>
                    <SelectContent className="w-[5rem]">
                        {countries.map((option) => (
                            <SelectItem key={option.iso} value={option.iso}>{option.flag} {option.phoneCode}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Input type="number" placeholder="000 0000000" value={value.phone} onChange={onPhoneChange} disabled={disabled} className="flex-1" />
            </div>
            {isError ? <p className="text-[0.65rem] text-red-500 px-2 mt-1 absolute bottom-0 left-0 translate-y-full">{error}</p> : null}
     </div>
    )
}

export function InputOTPPattern({onChange, value, isError, onComplete}) {
    return (
      <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} onChange={onChange} value={value} onComplete={onComplete}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    )
}

export const TextareaField = ({label, name, placeholder, value, onChange, error, isError, readOnly = false, onBlur, disabled = false, autoFocus = false, className, classNames, startContent, endContent, ...props}) => {
    
    const id = useId()
    
    return (
        <div className={cn("grid w-full items-center relative", className)}>
            <Label htmlFor={id} className={cn("mb-2", classNames?.label)}>{label}</Label>
            <div className={cn("relative w-full flex flex-col", classNames?.wrapper)}>
                <Textarea
                    {...props}  
                    name={name}
                    id={id} value={value} 
                    placeholder={placeholder}
                    onChange={onChange} 
                    error={error} 
                    isError={isError} 
                    readOnly={readOnly} 
                    onBlur={onBlur} 
                    disabled={disabled} 
                    autoFocus={autoFocus} 
                    className={cn("w-full", classNames?.input)}
                />
                {startContent ?
                    <div className={cn("absolute left-0 top-0 bottom-0 flex items-center justify-center h-full w-auto aspect-square", classNames?.startContent)}>{startContent}</div>
                : null}
                {endContent ? 
                    <div className={cn("absolute right-0 top-0 bottom-0 flex items-center justify-center h-full w-auto aspect-square", classNames?.endContent)}>{endContent}</div>
                : null}
            </div>
            {isError ? <p className={cn("text-[0.65rem] text-red-500 px-2 mt-1 absolute bottom-0 left-0 translate-y-full", classNames?.error)}>{error}</p> : null}
        </div>
    )
}

export const DragFileUploader = ({
    label, 
    name, 
    value, 
    onChange, 
    error, 
    isError, 
    readOnly = false, 
    disabled = false, 
    className, 
    accept = 'image/png, image/jpeg, image/jpg, image/gif', 
    maxFileSize = 1024 * 1024 * 5,
    multiple = false,
    title = "Click here or Drag and drop files here",
    helperText = "Max file size is 5MB. Only png, jpg, jpeg, mp4, wmv, mpeg, pdf, and docx files are allowed.",
    classNames,
    iconSize = 30,
    isStatic = true,
}) => {
    
    const id = useId()
    const [isDragging, setIsDragging] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const uploadedFileRef = useRef(null)

    const handleFileChange = async (e) => {

        setIsLoading(true)

        try{
            const file = e[0]

            if (file) {
                
                const types = accept.trim().toLowerCase().split(',').map(t => t.trim())
                const fileType = file.type.toLowerCase()

                const isValid = fileType.includes(types)

                if (isValid) {
                    toast.error('Invalid file type')
                    return false
                }
                const size = file.size / 1024 / 1024
                if (size > maxFileSize) {
                    toast.error('File size is too large')
                    return false
                }

                const formData = new FormData()
                formData.append('file', file)
                formData.append('path', 'storage/assets/')

                const res = await orbit.upload.static({data: formData})
                
                if(res?.status){
                    onChange(res.data)
                    toast.success('File uploaded successfully')
                    return true
                }else{
                    toast.error('Failed to upload file')
                    return false
                }

            }
        }catch(error){
            console.log(error)
            toast.error('Failed to upload file')
            
            return false
        }finally{
            setIsLoading(false)
            if (uploadedFileRef && uploadedFileRef.current) {
                uploadedFileRef.current.value = null;
            }
        }
    }

    const handleFileRemove = useCallback(() => {
        onChange(null)
    }, [value])
    
    const handleDragEnter = () => {
        setIsDragging(true)
    }
    const handleDragLeave = () => {
        setIsDragging(false)
    }
    const handleDragOver = (e) => {
        e.preventDefault()
    }
    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        handleFileChange(e.dataTransfer.files)
    }


    return (
        <div className={cn("grid w-full items-center relative", classNames?.wrapper, className)}>
            <Label htmlFor={id} className="mb-2">{label}</Label>
            <div className={cn("relative w-full min-h-20 rounded-lg border border-dashed dark:border-border-300 border-border-600/90 px-5 py-6 flex items-center justify-center group cursor-pointer transition-all duration-300 hover:border-primary/50 hover:!bg-text/2 flex-col gap-1 text-center",
              isDragging ? "border-primary/50 bg-primary/2" : null,
                classNames?.wrapper,
                isError ? "border-danger/75" : null)}>
                <input ref={uploadedFileRef} type="file" name={name} id={id} onChange={(e) => handleFileChange(e.target.files)} disabled={disabled} readOnly={readOnly} className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full" accept={accept} multiple={multiple} onDrop={handleDrop} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} />
                <div className={cn("relative flex flex-col items-center justify-center w-18 h-18 rounded-full bg-text/5 mb-2 transition-colors duration-300 group-hover:bg-text/10",
                    isDragging ? "bg-primary/2" : null,
                    classNames?.icon,
                )}>
                <HardDriveUpload size={iconSize} className={cn("text-text/60")} />
                </div>
                <h3 className="text-sm font-medium text-text/85">{title}</h3>
                <p className="text-xs opacity-50 w-full">{helperText}</p>

                {value?.path ? (
                    <div className="absolute top-0 left-0 w-full h-full z-20">
                        <ImageComponent isStatic={true} imageKey={value.path} className="w-full h-full object-contain" />

                        <button title="Remove file" type="button" onClick={handleFileRemove}  className="absolute top-3 right-3 p-1 cursor-pointer rounded-md bg-danger/70 hover:bg-danger/90 transition-all duration-300 backdrop-blur-sm border border-danger/90">
                            <XIcon size={14} className="text-white" />
                        </button>
                    </div>
                ) : null}

                <AnimatePresence>
                    {
                        isLoading ? 
                        <FormLoader key="form-loader" className="z-20"/>
                        :
                        null
                    }
                </AnimatePresence>
            </div>
            {isError ? <p className="text-[0.65rem] text-red-500 px-2 mt-1 absolute bottom-0 left-0 translate-y-full">{error}</p> : null}
        </div>
    )
}

export const AttachmentUploader = ({
    label, 
    name, 
    value, 
    onChange, 
    error, 
    isError, 
    readOnly = false, 
    disabled = false, 
    className, 
    accept = 'image/*', 
    maxFileSize = 1024 * 1024 * 5,
    classNames,
    isSingle = false,
    bucket = 'tickets',
    isStatic = false,
}) => {
    const id = useId()
    const fileInputRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleFileChange = async (e) => {
        const files = e.target.files

        if(isStatic) {
            return true
        }

        try{
            setIsLoading(true)
            if(files.length > 0) {
                const file = files[0]

                const types = accept.trim().toLowerCase().split(',').map(t => t.trim())
                const fileType = file.type.toLowerCase()

                const isValid = types.some(type => {
                    if (type.endsWith('/*')) {
                        const category = type.split('/')[0]
                        return fileType.startsWith(category + '/')
                    }
                    return fileType === type
                })

                if(!isValid) {
                    toast.error('Invalid file type')
                    return false
                }

                const size = file.size / 1024 / 1024
                if(size > maxFileSize) {
                    toast.error('File size is too large')
                    return false
                }

                const formData = new FormData()
                formData.append('file', file)
                formData.append('bucket', bucket)
                formData.append('path', '')

                const res = await orbit.upload.s3Upload({data: formData})

                if(res?.status){
                    const list = [...value, res.data]
                    onChange(list)
                    return true
                }else{
                    toast.error('Failed to upload file')
                    return false
                }

            }
        }catch(error){
            console.log(error)
        }finally{
            if (fileInputRef && fileInputRef.current) {
                fileInputRef.current.value = null;
            }
            setIsLoading(false)
        }

    }

    const handleFileRemove = (key) => {
        const list = value.filter(item => item.key !== key)
        onChange(list)
    }

    return (
        <div className={cn("grid w-full items-center relative", classNames?.wrapper, className)}>
            <Label htmlFor={id} className="mb-3">{label}</Label>
            <div className={cn("relative grid grid-cols-5 gap-3", classNames?.grid)}>
                {
                    value?.length > 0 ? value?.map((item) => (
                        <div key={item.key} className={cn("w-full h-auto aspect-square rounded-lg border dark:border-border-300/80 border-border-600/70 flex items-center justify-center group cursor-pointer transition-all duration-300 hover:border-primary/50 hover:bg-text/5 relative overflow-hidden bg-bg-300",
                            isError ? "border-danger/75" : null,
                            classNames?.file,
                        )}>
                            {
                                item?.type.includes('image') ? (
                                    <ImageComponent src={item.key} bucket={item.bucket} className={cn("w-full h-full object-contain", classNames?.image)} />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <FileTextIcon size={34} className="text-text/60" />
                                    </div>
                                )
                            }
                            <button title="Remove file" type="button" onClick={() => handleFileRemove(item.key)}  className="absolute top-1 right-1 p-1 cursor-pointer rounded-md bg-danger/70 hover:bg-danger/90 transition-all duration-300 backdrop-blur-sm border border-danger/90">
                                <XIcon size={14} className="text-white" />
                            </button>
                        </div>
                    )) : null
                }
                {
                    (isSingle && value?.length === 0) ? (
                        <div className={cn("w-full h-auto aspect-square rounded-lg border border-dashed dark:border-border-300 border-border-600/90 flex items-center justify-center group cursor-pointer transition-all duration-300 hover:border-primary/50 hover:bg-text/5 relative overflow-hidden", 
                            isError ? "border-danger/75" : null,
                            classNames?.file,
                        )}>
                            <ImagePlus size={26} className={cn("text-text/60", classNames?.icon)} />
                            <input ref={fileInputRef} type="file" name={name} id={id} onChange={handleFileChange} disabled={disabled} readOnly={readOnly} className={cn("absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full", classNames?.input)} accept={accept} />
        
                            {isLoading ? <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-text/2 backdrop-blur-md z-10">
                                <Spinner className="size-8 text-text/80 animate-spin" />
                            </div>
                            : null}
                        </div>
                    ) : null
                }
            </div>
            {isError ? <p className="text-[0.65rem] text-red-500 px-2 mt-1 absolute bottom-0 left-0 translate-y-full">{error}</p> : null}
        </div>
    )
}