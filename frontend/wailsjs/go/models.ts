export namespace types {
	
	export class ImageInfo {
	    filename: string;
	    data: string;
	
	    static createFrom(source: any = {}) {
	        return new ImageInfo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.filename = source["filename"];
	        this.data = source["data"];
	    }
	}
	export class ScreenOrientation {
	    angle: number;
	    type: string;
	
	    static createFrom(source: any = {}) {
	        return new ScreenOrientation(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.angle = source["angle"];
	        this.type = source["type"];
	    }
	}
	export class Screen {
	    id: string;
	    availHeight: number;
	    availLeft: number;
	    availTop: number;
	    availWidth: number;
	    colorDepth: number;
	    devicePixelRatio: number;
	    height: number;
	    isExtended: boolean;
	    isInternal: boolean;
	    isPrimary: boolean;
	    label: string;
	    left: number;
	    orientation: ScreenOrientation;
	    pixelDepth: number;
	    top: number;
	    width: number;
	
	    static createFrom(source: any = {}) {
	        return new Screen(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.availHeight = source["availHeight"];
	        this.availLeft = source["availLeft"];
	        this.availTop = source["availTop"];
	        this.availWidth = source["availWidth"];
	        this.colorDepth = source["colorDepth"];
	        this.devicePixelRatio = source["devicePixelRatio"];
	        this.height = source["height"];
	        this.isExtended = source["isExtended"];
	        this.isInternal = source["isInternal"];
	        this.isPrimary = source["isPrimary"];
	        this.label = source["label"];
	        this.left = source["left"];
	        this.orientation = this.convertValues(source["orientation"], ScreenOrientation);
	        this.pixelDepth = source["pixelDepth"];
	        this.top = source["top"];
	        this.width = source["width"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

