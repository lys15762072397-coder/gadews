"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// 修复 Leaflet 在 Next.js 中的默认图标路径丢失问题
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface MapProps {
  showHeatmap?: boolean;
  showCases?: boolean;
  showCoverage?: boolean;
  showSST?: boolean;
  showChlorophyll?: boolean;
  showRainfall?: boolean;
  showBoundaries?: boolean;
  showWaterSystems?: boolean;
  showFarmDensity?: boolean;
}

export default function RealMap({ showCases, showHeatmap }: MapProps) {
  return (
    // MapContainer 是真实地图的容器，中心点设置在亚洲/中国南海附近
    <MapContainer
      center={[20.0, 110.0]}
      zoom={5}
      zoomControl={false} // 隐藏默认的加减号，保持界面干净
      style={{ height: "100%", width: "100%", zIndex: 0 }}
    >
      {/* 接入 CartoDB 的暗黑风格世界地图 API (极具科幻感，完美契合你的UI) */}
      <TileLayer
        attribution='&copy; <a href="https://www.amap.com/">高德地图</a>'
        url="https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
      />

      {/* 测试数据层：当打开 "Cases" (疫情事件) 开关时显示真实的地图标记 */}
      {showCases && (
        <>
          <CircleMarker center={[21.5, 111.0]} radius={8} color="#ef4444" fillColor="#ef4444" fillOpacity={0.7}>
            <Tooltip direction="top" offset={[0, -10]} opacity={1}>
              <div className="text-xs font-bold">WSSV Outbreak</div>
              <div className="text-[10px]">South China Sea Farm</div>
            </Tooltip>
          </CircleMarker>
          <CircleMarker center={[18.2, 109.5]} radius={8} color="#ef4444" fillColor="#ef4444" fillOpacity={0.7}>
            <Tooltip direction="top" offset={[0, -10]} opacity={1}>
              <div className="text-xs font-bold">EHP Detected</div>
              <div className="text-[10px]">Hainan Coastal Region</div>
            </Tooltip>
          </CircleMarker>
        </>
      )}

      {/* 测试数据层：当打开 "Heatmap" (热力图) 开关时显示 */}
      {showHeatmap && (
        <>
          <CircleMarker center={[20.5, 110.5]} radius={40} color="transparent" fillColor="#f59e0b" fillOpacity={0.3} />
          <CircleMarker center={[21.0, 111.2]} radius={60} color="transparent" fillColor="#ef4444" fillOpacity={0.2} />
        </>
      )}

      {/* 模拟高风险疫情爆发点：实心红点 + 透明红圈（发光效果） */}
      {showCases && (
        <>
          <CircleMarker center={[21.5, 111.0]} radius={6} color="#ffffff" weight={2} fillColor="#ef4444" fillOpacity={1}>
            <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <div className="text-xs font-bold">WSSV Outbreak</div>
            </Tooltip>
          </CircleMarker>
          {/* 外围发光圈 */}
        <CircleMarker center={[21.5, 111.0]} radius={20} color="#ef4444" weight={1} fillColor="#ef4444" fillOpacity={0.15} interactive={false} />
      </>
    )}
      {/* 模拟环境热力图 (例如海温/叶绿素异常)：使用更明亮的渐变色系如青色或橙色 */}
      {showHeatmap && (
        <>
          <CircleMarker center={[20.5, 110.5]} radius={45} color="#00ffff" weight={1} fillColor="#00ffff" fillOpacity={0.2} interactive={false} />
          <CircleMarker center={[21.0, 111.2]} radius={70} color="#ff0055" weight={0} fillColor="#ff0055" fillOpacity={0.15} interactive={false} />
        </>
      )}
      {/* 你可以根据需要继续增加 showSST (海温), showChlorophyll (叶绿素) 的真实数据渲染 */}
    </MapContainer>
  );
}