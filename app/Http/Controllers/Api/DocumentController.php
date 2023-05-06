<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDocumentRequest;
use App\Http\Requests\UpdateDocumentRequest;
use App\Http\Resources\DocumentResource;
use App\Models\Document;

class DocumentController extends Controller
{
    /**
     * 
     */
    public function index()
    {
        $documents = Document::all();
        return DocumentResource::collection($documents);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDocumentRequest $request)
    {
        $data = $request->validated();
        $document = Document::create($data);
        return (new DocumentResource($document))->response()->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Document $document)
    {
        return new DocumentResource($document);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDocumentRequest $request, Document $document)
    {
        $data = $request->validated();
        $document->update($data);
        return new DocumentResource($document);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Document $document)
    {
        $document->delete();
        return response("", 204);
    }
}