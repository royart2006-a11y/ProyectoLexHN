// src/screens/PdfViewer.tsx
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system/legacy";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { CODIGOS } from "../data/codigos";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "PdfViewer">;

// Construye una página HTML que carga pdf.js desde un CDN y renderiza
// cada página del PDF dentro de un <canvas>, en modo scroll vertical.
function construirHtml(base64Pdf: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, user-scalable=yes">
  <style>
    html, body { margin: 0; background: #525659; }
    canvas { display: block; margin: 10px auto; box-shadow: 0 2px 6px rgba(0,0,0,0.4); }
    #loading { color: white; text-align: center; padding-top: 40px; font-family: sans-serif; }
  </style>
</head>
<body>
  <div id="loading">Cargando documento...</div>
  <div id="pages"></div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
  <script>
    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

    const base64 = "${base64Pdf}";
    const raw = atob(base64);
    const bytes = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);

    // devicePixelRatio: en un celular con pantalla Retina/HiDPI, esto suele ser 2 o 3.
    // Renderizamos el canvas a esa densidad real, para que se vea nítido en vez de borroso.
    const outputScale = window.devicePixelRatio || 1;

    pdfjsLib.getDocument({ data: bytes }).promise.then(async (pdf) => {
      document.getElementById("loading").style.display = "none";
      const container = document.getElementById("pages");

      for (let numPagina = 1; numPagina <= pdf.numPages; numPagina++) {
        const pagina = await pdf.getPage(numPagina);
        const escala = (window.innerWidth / pagina.getViewport({ scale: 1 }).width) * 0.95;
        const viewport = pagina.getViewport({ scale: escala });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // El tamaño REAL del canvas (buffer de píxeles) es más grande...
        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        // ...pero el tamaño VISUAL en pantalla se mantiene igual, vía CSS.
        canvas.style.width = Math.floor(viewport.width) + "px";
        canvas.style.height = Math.floor(viewport.height) + "px";

        container.appendChild(canvas);

        const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined;
        await pagina.render({ canvasContext: ctx, viewport, transform }).promise;
      }
    }).catch(() => {
      document.getElementById("loading").innerText = "No se pudo cargar el documento.";
    });
  </script>
</body>
</html>`;
}

export default function PdfViewer({ route }: Props) {
  const { codigoId } = route.params;
  const [html, setHtml] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      const codigo = CODIGOS.find((c) => c.id === codigoId);
      if (!codigo) {
        setError(true);
        return;
      }

      try {
        const asset = Asset.fromModule(codigo.pdfAsset);
        await asset.downloadAsync();

        if (!asset.localUri) {
          setError(true);
          return;
        }

        // Leemos el PDF y lo convertimos a base64, para poder inyectarlo
        // directamente dentro del HTML que carga pdf.js.
        const base64 = await FileSystem.readAsStringAsync(asset.localUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        setHtml(construirHtml(base64));
      } catch {
        setError(true);
      }
    };

    cargar();
  }, [codigoId]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No se pudo cargar el documento.</Text>
      </View>
    );
  }

  if (!html) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0B2545" />
        <Text style={styles.loadingText}>Preparando documento...</Text>
      </View>
    );
  }

  return (
    <WebView
      originWhitelist={["*"]}
      source={{ html }}
      style={styles.webview}
    />
  );
}

const styles = StyleSheet.create({
  webview: { flex: 1 },
  centered: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#F4EFE6" },
  errorText: { color: "#B03A2E", fontSize: 14 },
  loadingText: { marginTop: 10, color: "#5C6B7A", fontSize: 13 },
});