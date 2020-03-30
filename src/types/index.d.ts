declare module '@vitalets/google-translate-api' {
    interface Opts {
        from?: string
        to?: string
        raw?: boolean
        client?: 't' | 'gtx'
        tld?: string
    }
    interface Result {
        text: string
        from: From
        raw: string
    }
    interface From {
        language: Language
        text: Text
    }
    interface Language {
        didYouMean: boolean
        iso: string
    }
    interface Text {
        autoCorrected: boolean
        value: string
        didYouMean: boolean
    }
    export default function translate(text: string, opts?: Opts, gotopts?: {}): Promise<Result>;
}