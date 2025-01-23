import React from "react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { RepeatIcon as Record, CircleStopIcon as Stop, Mic, MicOff, Cog } from "lucide-react";
// import { RecordingTypeManager, type RecordingType } from "./recording-type-manager";

export function Config() {
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(50);
  const [selectedScreen, setSelectedScreen] = useState("");
  const [recordingQuality, setRecordingQuality] = useState("720p");
  const [fps, setFps] = useState("30");
  const [outputFormat, setOutputFormat] = useState("mp4");
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  // const [recordingTypes, setRecordingTypes] = useState<RecordingType[]>([
  //   { id: "default", name: "Padrão", color: "#000000" },
  //   { id: "daily", name: "Daily", color: "#4CAF50" },
  // ]);
  // const [selectedRecordingType, setSelectedRecordingType] = useState<RecordingType>(recordingTypes[0]);
  const [openFolders, setOpenFolders] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleFolder = (folderId: string) => {
    setOpenFolders((prev) => (prev.includes(folderId) ? prev.filter((id) => id !== folderId) : [...prev, folderId]));
  };

  // const startRecording = useCallback(async () => {
  //   try {
  //     const constraints: DisplayMediaStreamConstraints = {
  //       video: {
  //         displaySurface: selectedScreen === "window" ? "window" : "monitor",
  //         frameRate: { ideal: Number.parseInt(fps) },
  //
  //       },
  //       audio: !isMuted,
  //     }
  //
  //     const stream = await navigator.mediaDevices.getDisplayMedia(constraints)
  //     if (videoRef.current) {
  //       videoRef.current.srcObject = stream
  //       videoRef.current.play()
  //     }
  //
  //     const mediaRecorder = new MediaRecorder(stream, {
  //       mimeType: `video/${outputFormat}`,
  //       videoBitsPerSecond: recordingQuality === "1080p" ? 8000000 : recordingQuality === "720p" ? 5000000 : 2500000,
  //     })
  //
  //     const chunks: Blob[] = []
  //     mediaRecorder.ondataavailable = (event) => {
  //       if (event.data.size > 0) {
  //         chunks.push(event.data)
  //       }
  //     }
  //
  //     mediaRecorder.onstop = () => {
  //       const blob = new Blob(chunks, { type: `video/${outputFormat}` })
  //       const url = URL.createObjectURL(blob)
  //       // Aqui você pode salvar o URL ou o blob, dependendo de como deseja lidar com a gravação
  //       console.log("Recording finished, blob URL:", url)
  //     }
  //
  //     mediaRecorder.start()
  //     setMediaRecorder(mediaRecorder)
  //     setIsRecording(true)
  //   } catch (err) {
  //     console.error("Error: " + err)
  //   }
  // }, [selectedScreen, fps, recordingQuality, isMuted, outputFormat])

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <div className="flex-1 overflow-hidden p-6">
        <Card className="h-full">
          <CardContent className="flex h-full flex-col p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4 flex-grow overflow-hidden rounded-lg bg-gray-900"
            >
              <video ref={videoRef} className="h-full w-full object-cover" />
            </motion.div>

            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Label>Tipo de Gravação:</Label>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* {recordingTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        <div className="flex items-center space-x-2">
                          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: type.color }} />
                          <span>{type.name}</span>
                        </div>
                      </SelectItem>
                    ))} */}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <AnimatePresence mode="wait">
                  {!isRecording ? (
                    <motion.div
                      key="record"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      <Button variant="destructive" size="lg">
                        <Record className="mr-2 h-4 w-4" /> Iniciar Gravação
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="stop"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      <Button variant="outline" size="lg">
                        <Stop className="mr-2 h-4 w-4" /> Parar Gravação
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={() => setIsConfigOpen(!isConfigOpen)}>
                        <Cog className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Configurações</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <AnimatePresence>
        {isConfigOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200 bg-white"
          >
            <div className="container mx-auto p-6">
              <Tabs defaultValue="settings" className="w-full">
                <TabsList className="mb-4 grid w-full grid-cols-3">
                  <TabsTrigger value="settings">Configurações</TabsTrigger>
                  <TabsTrigger value="recordings">Gravações</TabsTrigger>
                  <TabsTrigger value="types">Tipos de Gravação</TabsTrigger>
                </TabsList>
                <TabsContent value="settings">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-2">
                      <Label>Selecionar Tela</Label>
                      <Select value={selectedScreen} onValueChange={setSelectedScreen}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecionar tela" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="screen1">Tela Principal</SelectItem>
                          <SelectItem value="screen2">Tela Secundária</SelectItem>
                          <SelectItem value="window">Janela Específica</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Qualidade de Gravação</Label>
                      <Select value={recordingQuality} onValueChange={setRecordingQuality}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecionar qualidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="480p">480p</SelectItem>
                          <SelectItem value="720p">720p</SelectItem>
                          <SelectItem value="1080p">1080p</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>FPS</Label>
                      <Select value={fps} onValueChange={setFps}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecionar FPS" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 FPS</SelectItem>
                          <SelectItem value="60">60 FPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Formato de Saída</Label>
                      <Select value={outputFormat} onValueChange={setOutputFormat}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecionar formato" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mp4">MP4</SelectItem>
                          <SelectItem value="webm">WebM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="col-span-full space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                          <Label>Microfone</Label>
                        </div>
                        <Switch checked={!isMuted} onCheckedChange={(checked) => setIsMuted(!checked)} />
                      </div>
                      <Slider
                        value={[volume]}
                        max={100}
                        step={1}
                        className="w-full"
                        onValueChange={(value) => setVolume(value[0])}
                        disabled={isMuted}
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="recordings">
                  <div className="space-y-4">
                    {/* {recordingTypes.map((type) => (
                      <div key={type.id}>
                        <motion.div
                          initial={false}
                          animate={{ height: openFolders.includes(type.id) ? "auto" : 40 }}
                          className="overflow-hidden rounded-lg bg-gray-100"
                        >
                          <div
                            className="flex cursor-pointer items-center justify-between p-2"
                            onClick={() => toggleFolder(type.id)}
                            style={{ backgroundColor: type.color + "20" }}
                          >
                            <div className="flex items-center space-x-2">
                              {openFolders.includes(type.id) ? (
                                <FolderOpen className="h-4 w-4" />
                              ) : (
                                <FolderClosed className="h-4 w-4" />
                              )}
                              <span>{type.name}</span>
                            </div>
                          </div>
                          {openFolders.includes(type.id) && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="space-y-2 p-2"
                            >
                              {["Gravação_01.mp4", "Gravação_02.mp4", "Gravação_03.mp4"].map((recording, index) => (
                                <div key={index} className="flex items-center justify-between rounded bg-white p-2">
                                  <div className="flex items-center space-x-2">
                                    <FileVideo className="h-4 w-4" />
                                    <span className="text-sm font-medium">{recording}</span>
                                  </div>
                                  <div className="flex space-x-2">
                                    <Button variant="ghost" size="icon">
                                      <Download className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </motion.div>
                      </div>
                    ))} */}
                  </div>
                </TabsContent>
                <TabsContent value="types">
                  {/* <RecordingTypeManager types={recordingTypes} onAddType={addRecordingType} /> */}
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
