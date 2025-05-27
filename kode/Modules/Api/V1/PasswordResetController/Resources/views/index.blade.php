@extends('api/-v1/-password-reset-controller::layouts.master')

@section('content')
    <h1>Hello World</h1>

    <p>
        This view is loaded from module: {!! config('api/-v1/-password-reset-controller.name') !!}
    </p>
@endsection
