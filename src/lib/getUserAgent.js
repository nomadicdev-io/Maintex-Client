function getUserAgent() {
    const ua = navigator.userAgent || "Unknown";
    const result = {
        rawUserAgent: ua,
        browser: {
            name: null,
            version: null,
            majorVersion: null
        },
        engine: {
            name: null,
            version: null
        },
        os: {
            name: null,
            version: null
        },
        device: {
            type: null,
            vendor: null,
            model: null
        },
        isMobile: false,
        isTablet: false,
        isDesktop: true
    };

    // Log the raw user agent for debugging
    console.log("Raw User Agent:", ua);

    // Browser detection with fallback
    if (/Edg/.test(ua)) {
        result.browser.name = 'Edge';
        result.browser.version = (ua.match(/Edg\/([\d.]+)/) || [])[1];
    } else if (/Chrome/.test(ua) && !/OPR/.test(ua)) {
        result.browser.name = 'Chrome';
        result.browser.version = (ua.match(/Chrome\/([\d.]+)/) || [])[1];
    } else if (/Safari/.test(ua) && !/Chrome/.test(ua)) {
        result.browser.name = 'Safari';
        result.browser.version = (ua.match(/Version\/([\d.]+)/) || [])[1];
    } else if (/Firefox/.test(ua)) {
        result.browser.name = 'Firefox';
        result.browser.version = (ua.match(/Firefox\/([\d.]+)/) || [])[1];
    } else if (/OPR/.test(ua)) {
        result.browser.name = 'Opera';
        result.browser.version = (ua.match(/OPR\/([\d.]+)/) || [])[1];
    } else {
        result.browser.name = 'Unknown';
    }

    // Extract major version
    if (result.browser.version) {
        result.browser.majorVersion = parseInt(result.browser.version.split('.')[0]);
    }

    // Engine detection
    if (/WebKit/.test(ua)) {
        result.engine.name = 'WebKit';
        result.engine.version = (ua.match(/AppleWebKit\/([\d.]+)/) || [])[1];
    } else if (/Gecko/.test(ua) && !/WebKit/.test(ua)) {
        result.engine.name = 'Gecko';
        result.engine.version = (ua.match(/rv:([\d.]+)/) || [])[1];
    } else {
        result.engine.name = 'Unknown';
    }

    // OS detection with improved Windows matching
    if (/Windows/.test(ua)) {
        result.os.name = 'Windows';
        result.os.version = (ua.match(/Windows NT ([\d.]+)/) || [])[1] || 'Unknown';
    } else if (/Mac OS X/.test(ua)) {
        result.os.name = 'Mac OS X';
        result.os.version = (ua.match(/Mac OS X ([\d_]+)/) || [])[1]?.replace(/_/g, '.') || 'Unknown';
    } else if (/Android/.test(ua)) {
        result.os.name = 'Android';
        result.os.version = (ua.match(/Android ([\d.]+)/) || [])[1] || 'Unknown';
    } else if (/iPhone|iPad|iPod/.test(ua)) {
        result.os.name = 'iOS';
        result.os.version = (ua.match(/OS ([\d_]+)/) || [])[1]?.replace(/_/g, '.') || 'Unknown';
    } else if (/Linux/.test(ua)) {
        result.os.name = 'Linux';
        result.os.version = 'Unknown';
    } else {
        result.os.name = 'Unknown';
    }

    // Device type detection
    if (/Mobile/.test(ua) || /Android/.test(ua) || /iPhone|iPod/.test(ua)) {
        result.isMobile = true;
        result.isDesktop = false;
        result.device.type = 'mobile';
    } else if (/iPad/.test(ua) || /Tablet/.test(ua)) {
        result.isTablet = true;
        result.isDesktop = false;
        result.device.type = 'tablet';
    }

    // Device vendor and model
    if (/iPhone/.test(ua)) {
        result.device.vendor = 'Apple';
        result.device.model = 'iPhone';
    } else if (/iPad/.test(ua)) {
        result.device.vendor = 'Apple';
        result.device.model = 'iPad';
    } else if (/Android/.test(ua)) {
        const androidModel = (ua.match(/\(([^)]+)\)/) || [])[1]?.split(';')[1]?.trim();
        result.device.vendor = androidModel?.split(' ')[0] || 'Unknown';
        result.device.model = androidModel || 'Unknown';
    }

    return result;
}

export default getUserAgent