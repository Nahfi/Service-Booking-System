

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Laravel React App</title>

        @viteReactRefresh
        @vite('resources/js/main.jsx')

        <!-- @php
        
            $manifestPath = public_path('build/manifest.json');
            $manifest = file_exists($manifestPath) ? json_decode(file_get_contents($manifestPath), true) : null;
            
            $mainJs = isset($manifest['resources/js/main.jsx']['file']) ? $manifest['resources/js/main.jsx']['file'] : null;
            $mainCss = isset($manifest['resources/js/main.jsx']['css'][0]) ? $manifest['resources/js/main.jsx']['css'][0] : null;
            $assetPath = asset('kode/public/build');

        @endphp

        @if ($mainJs)
                @if ($mainCss)
                    <link rel="stylesheet" href="{{ asset("{$assetPath}/{$mainCss}") }}">
                @endif
                <script type="module" src="{{ asset("{$assetPath}/{$mainJs}") }}"></script>
            @else
            <script>
                console.error("Vite build file not found. Please run `npm run build`.");
            </script>
        @endif -->

        <script>
            window.APP_BASE_URL = '{{ url('/') }}';
        </script>
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>
