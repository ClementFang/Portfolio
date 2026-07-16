# Clement Fang Portfolio — Upload Guide

把这个 ZIP 解压以后，将里面的内容上传到 GitHub 仓库根目录。

## 主要文件

- `index.html`：首页
- `artwork.html`：Illustration 独立详情页模板
- `style.css`：全部视觉样式
- `script.js`：首页、Logo、分类按钮功能
- `artwork.js`：详情页与全屏图片查看
- `works.js`：以后主要修改的作品资料文件

## 图片文件夹

Illustration：

```text
assets/illustration/ILL-001/
├── cover.jpg
├── final.jpg
├── process-01.jpg
└── process-02.jpg
```

Projects：

```text
assets/projects/PRJ-001/
└── cover.jpg
```

## 替换现有图片

例如替换第一件 Illustration 的首页封面，只需覆盖：

```text
assets/illustration/ILL-001/cover.jpg
```

如果浏览器继续显示旧图，打开 `works.js`，增加版本号：

```javascript
window.PORTFOLIO_VERSION = "2026-07-16-2";
```

## 新增 Illustration

1. 建立新文件夹，例如 `assets/illustration/ILL-007/`。
2. 上传 `cover.jpg`、`final.jpg` 和制作过程图片。
3. 在 `works.js` 的 `illustration` 数组中复制一条完整记录。
4. 修改 `id`、`title`、`year`、`cover`、`gallery`。

示例：

```javascript
{
  id: "ILL-007",
  title: "New Illustration",
  year: "2026",
  cover: "ILL-007/cover.jpg",
  ratio: "landscape",
  layout: "one",
  fit: "contain",
  medium: "Digital illustration",
  description: "Project description.",
  gallery: [
    { file: "ILL-007/final.jpg", caption: "Final illustration" },
    { file: "ILL-007/process-01.jpg", caption: "Process 01" }
  ]
}
```

## 图片格式

JPG、PNG、WebP 都可以。文件后缀必须与 `works.js` 完全一致。

## GitHub 上传提醒

上传 ZIP 本身不会自动展开。请先在电脑解压 ZIP，再把里面的文件和文件夹上传到仓库。
