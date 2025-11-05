
function detectBrowser(userAgent) {
    const ua = userAgent.toLowerCase()
    
    // Chrome (also matches Edge Chromium, but we check Edge first)
    if (ua.includes('edg/')) {
        const match = userAgent.match(/Edg\/([\d.]+)/i)
        return {
            name: 'Edge',
            version: match ? match[1] : 'unknown'
        }
    }
    
    // Firefox
    if (ua.includes('firefox/')) {
        const match = userAgent.match(/Firefox\/([\d.]+)/i)
        return {
            name: 'Firefox',
            version: match ? match[1] : 'unknown'
        }
    }
    
    // Safari (but not Chrome)
    if (ua.includes('safari/') && !ua.includes('chrome/')) {
        const match = userAgent.match(/Version\/([\d.]+)/i)
        return {
            name: 'Safari',
            version: match ? match[1] : 'unknown'
        }
    }
    
    // Chrome
    if (ua.includes('chrome/')) {
        const match = userAgent.match(/Chrome\/([\d.]+)/i)
        return {
            name: 'Chrome',
            version: match ? match[1] : 'unknown'
        }
    }
    
    // Opera
    if (ua.includes('opera/') || ua.includes('opr/')) {
        const match = userAgent.match(/(?:Opera|OPR)\/([\d.]+)/i)
        return {
            name: 'Opera',
            version: match ? match[1] : 'unknown'
        }
    }
    
    // Internet Explorer
    if (ua.includes('msie') || ua.includes('trident/')) {
        const match = userAgent.match(/(?:MSIE |rv:)([\d.]+)/i)
        return {
            name: 'Internet Explorer',
            version: match ? match[1] : 'unknown'
        }
    }
    
    // Default fallback
    return {
        name: 'Unknown',
        version: 'unknown'
    }
}

function detectOS(userAgent) {
    const ua = userAgent.toLowerCase()
    const platform = navigator.platform?.toLowerCase() || ''
    
    // Windows
    if (ua.includes('windows nt')) {
        const versionMatch = userAgent.match(/Windows NT ([\d.]+)/i)
        let version = 'unknown'
        if (versionMatch) {
            const ntVersion = versionMatch[1]
            const versionMap = {
                '10.0': '10/11',
                '6.3': '8.1',
                '6.2': '8',
                '6.1': '7',
                '6.0': 'Vista',
                '5.1': 'XP',
                '5.0': '2000'
            }
            version = versionMap[ntVersion] || ntVersion
        }
        return {
            name: 'Windows',
            version: version
        }
    }
    
    // macOS
    if (ua.includes('mac os x') || ua.includes('macintosh')) {
        const match = userAgent.match(/Mac OS X ([\d_]+)/i)
        return {
            name: 'macOS',
            version: match ? match[1].replace(/_/g, '.') : 'unknown'
        }
    }
    
    // iOS
    if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ipod')) {
        const match = userAgent.match(/OS ([\d_]+)/i)
        return {
            name: 'iOS',
            version: match ? match[1].replace(/_/g, '.') : 'unknown'
        }
    }
    
    // Android
    if (ua.includes('android')) {
        const match = userAgent.match(/Android ([\d.]+)/i)
        return {
            name: 'Android',
            version: match ? match[1] : 'unknown'
        }
    }
    
    // Linux
    if (ua.includes('linux')) {
        return {
            name: 'Linux',
            version: 'unknown'
        }
    }
    
    // Use navigator.userAgentData if available (modern browsers)
    if (navigator.userAgentData) {
        return {
            name: navigator.userAgentData.platform || 'Unknown',
            version: navigator.userAgentData.platformVersion || 'unknown'
        }
    }
    
    // Fallback to platform
    return {
        name: platform || 'Unknown',
        version: 'unknown'
    }
}

function detectDeviceType(userAgent) {
    const ua = userAgent.toLowerCase()
    const width = window.screen?.width || 0
    const height = window.screen?.height || 0
    
    // Check for mobile patterns in user agent
    const isMobileUA = /mobile|android|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop/i.test(userAgent)
    
    // Check for tablet patterns
    const isTabletUA = /tablet|ipad|playbook|silk|(android(?!.*mobile))/i.test(userAgent)
    
    // Screen size based detection
    const isMobileSize = width <= 768 || (width <= 1024 && height <= 768)
    const isTabletSize = width > 768 && width <= 1024
    
    // Combine UA and screen size detection
    if (isTabletUA || (isTabletSize && !isMobileUA)) {
        return 'tablet'
    }
    
    if (isMobileUA || isMobileSize) {
        return 'mobile'
    }
    
    return 'desktop'
}

function getUserAgent() {
    const userAgentString = navigator.userAgent || ''
    const browser = detectBrowser(userAgentString)
    const os = detectOS(userAgentString)
    const deviceType = detectDeviceType(userAgentString)
    
    return {
        userAgent: userAgentString,
        deviceType,
        browser: browser.name,
        os: os.name,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language || navigator.userLanguage || 'unknown',
    }
}

export default getUserAgent